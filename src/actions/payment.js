"use server"

import { client, Preference } from "../lib/mercadopago"
import { getSession } from "../lib/session"
import {
  createOrder,
  updateOrderStatus,
  findOrderByNumber,
} from "../controllers/orders"
import {
  findActiveReservation,
  confirmReservation,
  releaseReservation,
} from "../controllers/reservations"
import { setPersonalInfo } from "@/controllers/users"

export async function createPreference(
  orderNumber,
  personalInfo,
  saveForLater,
) {
  try {
    if (!orderNumber) {
      return { error: "No order number provided" }
    }

    const session = await getSession()
    if (!session) {
      return { error: "You must be logged in to make a purchase" }
    }

    const reservation = await findActiveReservation(orderNumber)
    if (!reservation) {
      return {
        error:
          "Your reservation has expired or does not exist. Please go back to your cart and try again.",
      }
    }

    const existingOrder = await findOrderByNumber(orderNumber)
    if (existingOrder && existingOrder.preferenceId) {
      return {
        preferenceId: existingOrder.preferenceId,
        orderNumber: existingOrder.orderNumber,
      }
    }

    const order =
      existingOrder ??
      (await createOrder({
        userId: String(session.userId),
        items: reservation.cartSnapshot,
        totalAmount: reservation.totalAmount,
        orderNumber,
        personalInfo,
      }))

    if (saveForLater) {
      await setPersonalInfo(session.username, personalInfo)
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    const now = new Date()
    const expirationFrom = now.toISOString()
    const expirationTo = reservation.expiresAt.toISOString()

    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: reservation.cartSnapshot.map((item, index) => ({
          id: String(index + 1),
          title: item.name,
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

        await confirmReservation(orderNumber)

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

      // Pago fallido o cancelado: liberar la reserva y restaurar el stock
      if (orderStatus === "Cancelled") {
        await releaseReservation(orderNumber)
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
