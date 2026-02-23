"use server"

import { client, Preference, PaymentRefund } from "../lib/mercadopago"
import { getSession } from "../lib/session"
import {
  createOrder,
  updateOrderStatus,
  findPendingOrderForUser,
  cancelExpiredOrders,
  cancelPendingOrdersForUser,
  checkStockAvailability,
  deductStockForOrder,
  findOrderByNumber,
  markOrderAsRefund,
} from "../controllers/orders"

async function refundPayment(paymentId) {
  try {
    const refund = new PaymentRefund(client)
    await refund.create({ payment_id: Number(paymentId), body: {} })
    console.log(`Refund successful for paymentId=${paymentId}`)
    return { success: true }
  } catch (error) {
    const msg = error?.message || String(error)
    console.error(`Error refunding paymentId=${paymentId}:`, msg)

    const isTestEnv =
      msg.includes("Unauthorized use of live credentials") ||
      msg.includes("unauthorized")

    return {
      success: false,
      error: isTestEnv
        ? "Refund not available in test environment (sandbox)"
        : msg,
      isTestEnv,
    }
  }
}

export async function createPreference(cartItems) {
  try {
    if (!cartItems || cartItems.length === 0) {
      return { error: "Your cart is empty" }
    }

    const session = await getSession()
    if (!session) {
      return { error: "You must be logged in to make a purchase" }
    }

    await cancelExpiredOrders(30)

    const stockCheck = await checkStockAvailability(cartItems)
    if (stockCheck.error) {
      return { error: stockCheck.error }
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    )

    const existingOrder = await findPendingOrderForUser(
      String(session.userId),
      cartItems,
      totalAmount,
    )
    if (existingOrder && existingOrder.preferenceId) {
      console.log("Reusing existing preference:", existingOrder.preferenceId)
      return {
        preferenceId: existingOrder.preferenceId,
        orderNumber: existingOrder.orderNumber,
      }
    }

    await cancelPendingOrdersForUser(String(session.userId))

    const order = await createOrder({
      userId: String(session.userId),
      items: cartItems,
      totalAmount,
    })

    console.log("Order created:", order.orderNumber)

    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    const now = new Date()
    const expirationFrom = now.toISOString()
    const expirationTo = new Date(now.getTime() + 30 * 60 * 1000).toISOString()

    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: cartItems.map((item, index) => ({
          id: String(index + 1),
          title: item.title,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "ARS",
        })),
        external_reference: order.orderNumber,
        back_urls: {
          success: `${appUrl}/buy/success?status=approved&order=${order.orderNumber}`,
          failure: `${appUrl}/buy/failure?status=failure&order=${order.orderNumber}`,
          pending: `${appUrl}/buy/pending?status=pending&order=${order.orderNumber}`,
        },
        auto_return: "approved",
        notification_url: `${appUrl}/api/webhooks/mercadopago`,
        expiration_date_from: expirationFrom,
        expiration_date_to: expirationTo,
      },
    })

    console.log("Preference created:", result.id)

    await updateOrderStatus(order.orderNumber, "Pending", null, result.id)

    return { preferenceId: result.id, orderNumber: order.orderNumber }
  } catch (error) {
    console.error(
      "Error creating MercadoPago preference:",
      error?.message || error,
    )
    console.error("Details:", JSON.stringify(error?.cause || error, null, 2))
    return { error: "Error creating payment preference" }
  }
}

export async function verifyPayment(orderNumber) {
  try {
    if (!orderNumber) {
      return { error: "No order number provided" }
    }

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/search?external_reference=${orderNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      },
    )

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const payment = data.results[0]

      console.log(
        "verifyPayment - status:",
        payment.status,
        "order:",
        orderNumber,
      )

      const statusMap = {
        approved: "Payed",
        pending: "Pending",
        in_process: "Pending",
        rejected: "Cancelled",
        cancelled: "Cancelled",
        refunded: "Cancelled",
      }

      const orderStatus = statusMap[payment.status] || "Pending"

      if (orderStatus === "Payed") {
        const currentOrder = await findOrderByNumber(orderNumber)

        if (!currentOrder) {
          return { status: "not_found", orderStatus: "Pending" }
        }

        if (currentOrder.status === "Payed") {
          return {
            status: payment.status,
            orderStatus: "Payed",
            orderNumber: currentOrder.orderNumber,
          }
        }

        if (currentOrder.status === "Cancelled" && currentOrder.refundReason) {
          return {
            status: "refunded",
            orderStatus: "Cancelled",
            orderNumber: currentOrder.orderNumber,
            error: currentOrder.refundReason,
          }
        }

        const stockResult = await deductStockForOrder(currentOrder)

        if (!stockResult.success) {
          const refundResult = await refundPayment(payment.id)

          const reason = refundResult.success
            ? `Automatic refund: ${stockResult.error}`
            : `Refund failed (manual action required): ${stockResult.error}`

          await markOrderAsRefund(orderNumber, payment.id, reason)

          return {
            status: "refunded",
            orderStatus: "Cancelled",
            orderNumber,
            error: stockResult.error,
            refunded: refundResult.success,
          }
        }

        const order = await updateOrderStatus(
          orderNumber,
          "Payed",
          String(payment.id),
        )

        return {
          status: payment.status,
          orderStatus: "Payed",
          orderNumber: order?.orderNumber,
        }
      }

      const order = await updateOrderStatus(
        orderNumber,
        orderStatus,
        String(payment.id),
      )

      return {
        status: payment.status,
        orderStatus,
        orderNumber: order?.orderNumber,
      }
    }

    return { status: "not_found", orderStatus: "Pending" }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return { error: "Error verifying payment" }
  }
}
