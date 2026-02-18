import { NextResponse } from "next/server"
import { Payment } from "mercadopago"
import { client } from "@/lib/mercadopago"
import PurchaseOrder from "@/models/orderModel"
import { deductStockForOrder } from "@/controllers/orders"
import { connectToDatabaseUnix } from "../../../../../connectDBUnix"
import crypto from "crypto"

function validateWebhookSignature(request, body) {
  const xSignature = request.headers.get("x-signature")
  const xRequestId = request.headers.get("x-request-id")
  const secret = process.env.MP_WEBHOOK_SECRET

  if (!secret) {
    console.warn(
      "Webhook - MP_WEBHOOK_SECRET no configurado, saltando validación de firma",
    )
    return true
  }

  if (!xSignature || !xRequestId) {
    console.warn("Webhook - Faltan headers x-signature o x-request-id")
    return false
  }

  const parts = xSignature.split(",")
  const tsValue = parts.find((p) => p.trim().startsWith("ts="))?.split("=")[1]
  const hashValue = parts.find((p) => p.trim().startsWith("v1="))?.split("=")[1]

  if (!tsValue || !hashValue) {
    console.warn("Webhook - Formato de x-signature inválido")
    return false
  }

  const dataId = body.data?.id
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${tsValue};`

  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(manifest)
  const generatedHash = hmac.digest("hex")

  if (generatedHash !== hashValue) {
    console.warn("Webhook - Firma inválida")
    return false
  }

  return true
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!validateWebhookSignature(request, body)) {
      console.error("Webhook - Firma de webhook inválida, rechazando")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    if (body.type !== "payment") {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const paymentId = body.data?.id
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
      console.warn("Webhook - No external_reference en el pago")
      return NextResponse.json({ received: true }, { status: 200 })
    }

    await connectToDatabaseUnix()

    const currentOrder = await PurchaseOrder.findOne({ orderNumber })
    if (!currentOrder) {
      console.warn(`Webhook - Orden no encontrada: ${orderNumber}`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (currentOrder.status === "Payed") {
      console.log(
        `Webhook - Orden ${orderNumber} ya está pagada, ignorando duplicado`,
      )
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (currentOrder.status === "Cancelled" && orderStatus !== "Payed") {
      console.log(`Webhook - Orden ${orderNumber} ya cancelada, ignorando`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const updatedOrder = await PurchaseOrder.findOneAndUpdate(
      { orderNumber },
      {
        status: orderStatus,
        paymentId: String(paymentId),
      },
      { new: true },
    )

    if (orderStatus === "Payed" && updatedOrder) {
      await deductStockForOrder(updatedOrder)
    }

    console.log(
      `Webhook - Orden actualizada: orderNumber=${orderNumber}, status=${orderStatus}`,
    )

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Error en webhook de Mercado Pago:", error)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
