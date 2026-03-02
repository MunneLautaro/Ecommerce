import mongoose from "mongoose"
import crypto from "crypto"
import { connectToDatabaseUnix } from "../../connectDBUnix"
import Product from "../models/productModel"
import Reservation from "../models/reservationsModel"

class InsufficientStockError extends Error {}

export async function createReservation(userId, cartItems) {
  await connectToDatabaseUnix()
  const session = await mongoose.startSession()

  try {
    const result = await session.withTransaction(async () => {
      await releaseExpiredReservationsForUser(userId, session)

      const reservedItems = []

      for (const item of cartItems) {
        const sku = item.sku || "-"
        const cantidad = Number(item.quantity)

        const product = await Product.findOneAndUpdate(
          { sku, stock: { $gte: cantidad } },
          { $inc: { stock: -cantidad } },
          { new: true, session },
        )

        if (!product) {
          throw new InsufficientStockError(
            `Insufficient stock for "${item.title}" (SKU: ${sku})`,
          )
        }

        reservedItems.push({ sku, cantidad })
      }

      const orderNumber = `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      )

      await Reservation.create(
        [
          {
            userId,
            orderNumber,
            items: reservedItems,
            cartSnapshot: cartItems.map((item) => ({
              sku: item.sku || "-",
              name: item.title || item.product || item.name || "Product",
              price: Number(item.price),
              quantity: Number(item.quantity),
              img: item.img?.startsWith("data:") ? "" : item.img || "", // ✅ nunca guardar base64
              description: item.description || "",
              brand: item.brand || "-",
              model: item.model || "-",
              color: item.color || "-",
            })),
            totalAmount,
            expiresAt,
          },
        ],
        { session },
      )

      return { success: true, orderNumber, expiresAt }
    })

    return result
  } catch (err) {
    if (err instanceof InsufficientStockError) {
      return { success: false, error: err.message }
    }
    throw err
  } finally {
    session.endSession()
  }
}

export async function releaseReservation(orderNumber) {
  await connectToDatabaseUnix()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      const reservation = await Reservation.findOne({ orderNumber }).session(
        session,
      )
      if (!reservation) return

      for (const item of reservation.items) {
        await Product.updateOne(
          { sku: item.sku },
          { $inc: { stock: item.cantidad } },
          { session },
        )
      }

      await Reservation.deleteOne({ orderNumber }, { session })
    })

    return { success: true }
  } finally {
    session.endSession()
  }
}

async function releaseExpiredReservationsForUser(userId, session) {
  const now = new Date()

  const expired = await Reservation.find({
    userId,
    expiresAt: { $lte: now },
  }).session(session)

  for (const reservation of expired) {
    for (const item of reservation.items) {
      await Product.updateOne(
        { sku: item.sku },
        { $inc: { stock: item.cantidad } },
        { session },
      )
    }
    await Reservation.deleteOne({ _id: reservation._id }, { session })
  }
}

export async function confirmReservation(orderNumber) {
  await connectToDatabaseUnix()
  await Reservation.deleteOne({ orderNumber })
}

export async function findActiveReservation(orderNumber) {
  await connectToDatabaseUnix()
  return Reservation.findOne({
    orderNumber,
    expiresAt: { $gt: new Date() },
  })
}
