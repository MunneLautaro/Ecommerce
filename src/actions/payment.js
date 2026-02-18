"use server"

import { client, Preference } from "../lib/mercadopago"
import { getSession } from "../lib/session"
import {
  createOrder,
  updateOrderStatus,
  findPendingOrderForUser,
  cancelExpiredOrders,
  cancelPendingOrdersForUser,
  checkStockAvailability,
  deductStockForOrder,
} from "../controllers/orders"

export async function createPreference(cartItems) {
  try {
    if (!cartItems || cartItems.length === 0) {
      return { error: "El carrito está vacío" }
    }

    const session = await getSession()
    if (!session) {
      return { error: "Debés iniciar sesión para comprar" }
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
      console.log(
        "Reutilizando preferencia existente:",
        existingOrder.preferenceId,
      )
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

    console.log("Orden creada:", order.orderNumber)

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

    console.log("Preference creada:", result.id)

    await updateOrderStatus(order.orderNumber, "Pending", null, result.id)

    return { preferenceId: result.id, orderNumber: order.orderNumber }
  } catch (error) {
    console.error(
      "Error creando preferencia de Mercado Pago:",
      error?.message || error,
    )
    console.error("Detalle:", JSON.stringify(error?.cause || error, null, 2))
    return { error: "Error al crear la preferencia de pago" }
  }
}

export async function verifyPayment(orderNumber) {
  try {
    if (!orderNumber) {
      return { error: "No se proporcionó el número de orden" }
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

      const order = await updateOrderStatus(
        orderNumber,
        orderStatus,
        String(payment.id),
      )

      if (orderStatus === "Payed" && order && order.status === "Payed") {
        await deductStockForOrder(order)
      }

      return {
        status: payment.status,
        orderStatus,
        orderNumber: order?.orderNumber,
      }
    }

    return { status: "not_found", orderStatus: "Pending" }
  } catch (error) {
    console.error("Error verificando pago:", error)
    return { error: "Error al verificar el pago" }
  }
}
