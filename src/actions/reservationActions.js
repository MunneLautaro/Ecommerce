"use server"

import { getSession } from "../lib/session"
import {
  createReservation,
  releaseReservation,
} from "../controllers/reservations"

export async function reserveStockAction(cartItems) {
  if (!cartItems || cartItems.length === 0) {
    return { error: "Your cart is empty" }
  }

  const session = await getSession()
  if (!session) {
    return { error: "You must be logged in to make a purchase" }
  }

  try {
    const normalizedItems = cartItems.map((item) => ({
      ...item,
      title: item.title || item.product || item.name || "Product",
      img: item.img?.startsWith("data:") ? "" : item.img || "",
    }))

    const result = await createReservation(
      String(session.userId),
      normalizedItems,
    )

    if (!result.success) {
      return { error: result.error }
    }

    return {
      success: true,
      orderNumber: result.orderNumber,
      expiresAt: result.expiresAt,
    }
  } catch (error) {
    console.error("Error reserving stock:", error?.message || error)
    return { error: "Error reserving stock, please try again" }
  }
}

export async function releaseReservationAction(orderNumber) {
  if (!orderNumber) {
    return { error: "No order number provided" }
  }

  const session = await getSession()
  if (!session) {
    return { error: "You must be logged in" }
  }

  try {
    const result = await releaseReservation(orderNumber)
    return result
  } catch (error) {
    console.error("Error releasing reservation:", error?.message || error)
    return { error: "Error releasing reservation" }
  }
}
