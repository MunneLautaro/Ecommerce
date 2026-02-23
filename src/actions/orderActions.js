"use server"

import { getSession, requireAuth } from "../lib/session"
import {
  getOrdersByUserWithFilter,
  getAllOrdersFiltered,
} from "../controllers/orders"

export async function getUserOrders(statusFilter = "") {
  const session = await getSession()
  if (!session) {
    return { error: "You must be logged in" }
  }

  const orders = await getOrdersByUserWithFilter(session.userId, statusFilter)
  return { orders }
}

export async function getAllOrders(statusFilter = "", userSearch = "") {
  const { authorized, error } = await requireAuth({ requireAdmin: true })
  if (!authorized) {
    return { error: error || "Unauthorized" }
  }

  const orders = await getAllOrdersFiltered(statusFilter, userSearch)
  return { orders }
}
