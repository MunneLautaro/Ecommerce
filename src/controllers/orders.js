import PurchaseOrder from "../models/orderModel"
import User from "../models/userModel"
import crypto from "crypto"
import { connectToDatabaseUnix } from "../../connectDBUnix"

export async function createOrder({
  userId,
  items,
  totalAmount,
  orderNumber: existingOrderNumber,
  personalInfo,
}) {
  await connectToDatabaseUnix()

  const orderNumber =
    existingOrderNumber ||
    `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`

  const userIdStr =
    typeof userId === "object" && userId?.buffer
      ? Buffer.from(Object.values(userId.buffer)).toString("hex")
      : String(userId)

  const order = new PurchaseOrder({
    orderNumber,
    user: userIdStr,
    deliveryAddress: {
      street: personalInfo?.deliveryAddress?.street || "",
      city: personalInfo?.deliveryAddress?.city || "",
      state: personalInfo?.deliveryAddress?.state || "",
      postalCode: personalInfo?.deliveryAddress?.postalCode || "",
      country: personalInfo?.deliveryAddress?.country || "AR",
    },
    items: items.map((item) => ({
      product: {
        sku: item.sku || "-",
        name: item.name || item.title || "Product",
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

export async function getMostOrderedProducts() {
  await connectToDatabaseUnix()

  const products = await PurchaseOrder.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product.sku",
        count: { $sum: 1 },
        totalQuantity: { $sum: "$items.product.cantidad" },
        totalRevenue: { $sum: "$items.totalPrice" },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "sku",
        as: "productInfo",
      },
    },
    { $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        sku: "$_id",
        product: "$productInfo.product",
        img: "$productInfo.img",
        price: "$productInfo.price",
        count: 1,
        totalQuantity: 1,
        totalRevenue: 1,
      },
    },
  ])
  return products
}
