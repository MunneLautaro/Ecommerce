import { NextResponse } from "next/server"
import { Payment, PaymentRefund } from "mercadopago"
import { client } from "@/lib/mercadopago"
import {
  deductStockForOrder,
  findOrderByNumber,
  markOrderAsRefund,
  updateOrderStatus,
} from "@/controllers/orders"
import crypto from "crypto"

async function refundPayment(paymentId) {
  try {
    const refund = new PaymentRefund(client)
    await refund.create({ payment_id: Number(paymentId), body: {} })
    console.log(`Webhook - Refund successful for paymentId=${paymentId}`)
    return { success: true }
  } catch (error) {
    const msg = error?.message || String(error)
    console.error(`Webhook - Error refunding paymentId=${paymentId}:`, msg)
    return {
      success: false,
      error: msg,
    }
  }
}

function validateWebhookSignature(request) {
  const xSignature = request.headers.get("x-signature")
  const xRequestId = request.headers.get("x-request-id")
  const secret = process.env.MP_WEBHOOK_SECRET

  if (!secret) {
    console.warn(
      "Webhook - MP_WEBHOOK_SECRET not configured, skipping signature validation",
    )
    return true
  }

  if (!xSignature || !xRequestId) {
    console.log("Webhook - No signature headers present, skipping validation")
    return true
  }

  const parts = xSignature.split(",")
  const tsValue = parts.find((p) => p.trim().startsWith("ts="))?.split("=")[1]
  const hashValue = parts.find((p) => p.trim().startsWith("v1="))?.split("=")[1]

  if (!tsValue || !hashValue) {
    console.warn("Webhook - Invalid x-signature format")
    return false
  }

  const url = new URL(request.url)
  const dataId = url.searchParams.get("data.id") || url.searchParams.get("id")

  let manifest = ""
  if (dataId) {
    manifest += `id:${dataId};`
  }
  manifest += `request-id:${xRequestId};ts:${tsValue};`

  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(manifest)
  const generatedHash = hmac.digest("hex")

  if (generatedHash !== hashValue) {
    console.warn("Webhook - Invalid signature")
    return false
  }

  return true
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!validateWebhookSignature(request)) {
      console.error("Webhook - Invalid webhook signature, rejecting")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const url = new URL(request.url)
    const topic = url.searchParams.get("topic")

    if (topic === "merchant_order") {
      console.log("Webhook - merchant_order received, ignoring")
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const isPayment = body.type === "payment" || topic === "payment"
    if (!isPayment) {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const paymentId =
      body.data?.id ||
      url.searchParams.get("data.id") ||
      url.searchParams.get("id")
    if (!paymentId) {
      return NextResponse.json({ error: "No payment ID" }, { status: 400 })
    }

    const payment = new Payment(client)
    const paymentData = await payment.get({ id: paymentId })

    console.log("Webhook - Payment status:", paymentData.status)
    console.log("Webhook - external_reference:", paymentData.external_reference)

    const statusMap = {
      approved: "Payed",
      pending: "Pending",
      in_process: "Pending",
      rejected: "Cancelled",
      cancelled: "Cancelled",
      refunded: "Cancelled",
    }

    const orderStatus = statusMap[paymentData.status] || "Pending"

    const orderNumber = paymentData.external_reference
    if (!orderNumber) {
      console.warn("Webhook - No external_reference in payment")
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const currentOrder = await findOrderByNumber(orderNumber)
    if (!currentOrder) {
      console.warn(`Webhook - Order not found: ${orderNumber}`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (currentOrder.status === "Payed") {
      console.log(
        `Webhook - Order ${orderNumber} already paid, ignoring duplicate`,
      )
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (currentOrder.status === "Cancelled" && orderStatus !== "Payed") {
      console.log(`Webhook - Order ${orderNumber} already cancelled, ignoring`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (orderStatus === "Payed") {
      const stockResult = await deductStockForOrder(currentOrder)

      if (!stockResult.success) {
        console.warn(
          `Webhook - Insufficient stock for order ${orderNumber}: ${stockResult.error}. Refunding...`,
        )

        const refundResult = await refundPayment(paymentId)

        const reason = refundResult.success
          ? `Automatic refund: ${stockResult.error}`
          : `Refund failed (manual action required): ${stockResult.error}`

        await markOrderAsRefund(orderNumber, paymentId, reason)

        console.log(
          `Webhook - Order ${orderNumber} cancelled due to insufficient stock. Refund: ${refundResult.success ? "successful" : "failed"}`,
        )
        return NextResponse.json({ received: true }, { status: 200 })
      }

      await updateOrderStatus(orderNumber, "Payed", String(paymentId))
    } else {
      await updateOrderStatus(orderNumber, orderStatus, String(paymentId))
    }

    console.log(
      `Webhook - Order updated: orderNumber=${orderNumber}, status=${orderStatus}`,
    )

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Error in MercadoPago webhook:", error)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
