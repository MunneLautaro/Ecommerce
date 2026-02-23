import PurchaseOrder from "../models/orderModel"
import Product from "../models/productModel"
import User from "../models/userModel"
import crypto from "crypto"
import { connectToDatabaseUnix } from "../../connectDBUnix"

export async function checkStockAvailability(cartItems) {
  await connectToDatabaseUnix()

  const insufficientItems = []

  for (const item of cartItems) {
    const sku = item.sku || "-"
    const requestedQty = Number(item.quantity)

    const product = await Product.findOne({ sku })
    if (!product) {
      insufficientItems.push(`"${item.title}" does not exist`)
      continue
    }

    if (product.stock < requestedQty) {
      insufficientItems.push(
        `"${item.title}" — available stock: ${product.stock}, requested: ${requestedQty}`,
      )
    }
  }

  if (insufficientItems.length > 0) {
    return { error: `Insufficient stock: ${insufficientItems.join("; ")}` }
  }

  return { ok: true }
}

export async function deductStockForOrder(order) {
  await connectToDatabaseUnix()

  const updated = await PurchaseOrder.findOneAndUpdate(
    { orderNumber: order.orderNumber, stockDeducted: { $ne: true } },
    { stockDeducted: true },
    { new: true },
  )

  if (!updated) {
    console.log(
      `Stock already deducted for order ${order.orderNumber}, skipping`,
    )
    return { success: true, alreadyDeducted: true }
  }

  const deductedItems = []

  for (const item of order.items) {
    const result = await Product.findOneAndUpdate(
      { sku: item.product.sku, stock: { $gte: item.product.cantidad } },
      { $inc: { stock: -item.product.cantidad } },
      { new: true },
    )

    if (!result) {
      console.warn(
        `Insufficient stock for SKU ${item.product.sku} (order ${order.orderNumber}). Reverting deductions...`,
      )

      for (const deducted of deductedItems) {
        await Product.updateOne(
          { sku: deducted.sku },
          { $inc: { stock: deducted.quantity } },
        )
      }

      await PurchaseOrder.updateOne(
        { orderNumber: order.orderNumber },
        { stockDeducted: false },
      )

      return {
        success: false,
        error: `Insufficient stock for "${item.product.name}" (SKU: ${item.product.sku})`,
      }
    }

    deductedItems.push({
      sku: item.product.sku,
      quantity: item.product.cantidad,
    })
  }

  console.log(
    `Stock deducted successfully: ${deductedItems.length} products (order ${order.orderNumber})`,
  )
  return { success: true }
}

export async function findPendingOrderForUser(userId, cartItems, totalAmount) {
  await connectToDatabaseUnix()

  const userIdStr =
    typeof userId === "object" && userId?.buffer
      ? Buffer.from(Object.values(userId.buffer)).toString("hex")
      : String(userId)

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)

  const pendingOrder = await PurchaseOrder.findOne({
    user: userIdStr,
    status: "Pending",
    preferenceId: { $exists: true, $ne: null },
    totalAmount,
    orderDate: { $gte: thirtyMinutesAgo },
  })

  if (!pendingOrder) return null

  const orderSkus = pendingOrder.items
    .map((i) => `${i.product.sku}:${i.product.cantidad}`)
    .sort()
    .join(",")
  const cartSkus = cartItems
    .map((i) => `${i.sku || "-"}:${i.quantity}`)
    .sort()
    .join(",")

  if (orderSkus !== cartSkus) return null

  return pendingOrder
}

export async function cancelExpiredOrders(minutesOld = 30) {
  await connectToDatabaseUnix()

  const cutoff = new Date(Date.now() - minutesOld * 60 * 1000)

  const result = await PurchaseOrder.updateMany(
    {
      status: "Pending",
      orderDate: { $lt: cutoff },
    },
    {
      status: "Cancelled",
    },
  )

  if (result.modifiedCount > 0) {
    console.log(`Expired orders cancelled: ${result.modifiedCount}`)
  }

  return result.modifiedCount
}

export async function cancelPendingOrdersForUser(userId) {
  await connectToDatabaseUnix()

  const userIdStr =
    typeof userId === "object" && userId?.buffer
      ? Buffer.from(Object.values(userId.buffer)).toString("hex")
      : String(userId)

  const result = await PurchaseOrder.updateMany(
    {
      user: userIdStr,
      status: "Pending",
    },
    {
      status: "Cancelled",
    },
  )

  if (result.modifiedCount > 0) {
    console.log(
      `Pending orders cancelled for user ${userIdStr}: ${result.modifiedCount}`,
    )
  }

  return result.modifiedCount
}

export async function createOrder({ userId, items, totalAmount }) {
  await connectToDatabaseUnix()

  const orderNumber = `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`

  const userIdStr =
    typeof userId === "object" && userId?.buffer
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

export async function findOrderByNumber(orderNumber) {
  await connectToDatabaseUnix()
  return PurchaseOrder.findOne({ orderNumber })
}

export async function markOrderAsRefund(orderNumber, paymentId, reason) {
  await connectToDatabaseUnix()
  return PurchaseOrder.findOneAndUpdate(
    { orderNumber },
    {
      status: "Cancelled",
      paymentId: String(paymentId),
      refundReason: reason,
    },
    { new: true },
  )
}

export async function updateOrderStatus(
  orderNumber,
  status,
  paymentId,
  preferenceId,
) {
  await connectToDatabaseUnix()

  const currentOrder = await PurchaseOrder.findOne({ orderNumber })
  if (!currentOrder) return null

  if (currentOrder.status === "Payed" && status !== "Payed") {
    console.log(
      `updateOrderStatus - Order ${orderNumber} already paid, not downgrading to ${status}`,
    )
    return currentOrder
  }

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

export async function getOrdersByUserWithFilter(userId, statusFilter = "") {
  await connectToDatabaseUnix()

  const query = { user: userId }
  if (statusFilter && statusFilter !== "all") {
    query.status = statusFilter
  }

  const orders = await PurchaseOrder.find(query).sort({ orderDate: -1 }).lean()

  return JSON.parse(JSON.stringify(orders))
}

export async function getAllOrdersFiltered(statusFilter = "", userSearch = "") {
  await connectToDatabaseUnix()

  const query = {}

  if (statusFilter && statusFilter !== "all") {
    query.status = statusFilter
  }

  if (userSearch && userSearch.trim()) {
    const userRegex = new RegExp(userSearch.trim(), "i")
    const matchingUsers = await User.find({
      $or: [{ user: userRegex }, { email: userRegex }, { name: userRegex }],
    }).select("_id")

    const userIds = matchingUsers.map((u) => u._id)
    query.user = { $in: userIds }
  }

  const orders = await PurchaseOrder.find(query)
    .populate("user", "user email name")
    .sort({ orderDate: -1 })
    .lean()

  return JSON.parse(JSON.stringify(orders))
}
