import PurchaseOrder from "../models/orderModel"
import crypto from "crypto"
import { connectToDatabaseUnix } from "../../connectDBUnix"

export async function createOrder({
  userId,
  items,
  totalAmount,
}) {
  await connectToDatabaseUnix()

  const orderNumber = `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`

  // Asegurar que userId sea un string hex válido para ObjectId
  const userIdStr = typeof userId === "object" && userId?.buffer
    ? Buffer.from(Object.values(userId.buffer)).toString("hex")
    : String(userId)

  const order = new PurchaseOrder({
    orderNumber,
    user: userIdStr,
    deliveryAddress: {
      street: "-",
      city: "-",
      state: "-",
      postalCode: "-",
      country: "AR",
    },
    items: items.map((item) => ({
      product: {
        sku: item.sku || "-",
        name: item.title,
        img: item.img || "",
        description: item.description || "",
        brand: item.brand || "-",
        model: item.model || "-",
        color: item.color || "-",
        price: item.price,
        cantidad: item.quantity,
      },
      totalPrice: item.price * item.quantity,
    })),
    totalAmount,
    status: "Pending",
  })

  await order.save()

  return order
}

export async function updateOrderStatus(orderNumber, status, paymentId, preferenceId) {
  await connectToDatabaseUnix()

  const updateData = { status }
  if (paymentId) {
    updateData.paymentId = paymentId
  }
  if (preferenceId) {
    updateData.preferenceId = preferenceId
  }

  const order = await PurchaseOrder.findOneAndUpdate(
    { orderNumber },
    updateData,
    { new: true },
  )

  return order
}

export async function getOrdersByUser(userId) {
  await connectToDatabaseUnix()

  const orders = await PurchaseOrder.find({ user: userId }).sort({
    orderDate: -1,
  })

  return orders
}
