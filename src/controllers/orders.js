import PurchaseOrder from "../models/orderModel"
import Product from "../models/productModel"
import User from "../models/userModel"
import crypto from "crypto"
import { connectToDatabaseUnix } from "../../connectDBUnix"

/**
 * Verifica que haya stock suficiente para todos los items del carrito.
 * Retorna { ok: true } si hay stock, o { error: "..." } con detalle si no.
 */
export async function checkStockAvailability(cartItems) {
  await connectToDatabaseUnix()

  const insufficientItems = []

  for (const item of cartItems) {
    const sku = item.sku || "-"
    const requestedQty = Number(item.quantity)

    const product = await Product.findOne({ sku })
    if (!product) {
      insufficientItems.push(`"${item.title}" no existe`)
      continue
    }

    if (product.stock < requestedQty) {
      insufficientItems.push(
        `"${item.title}" — stock disponible: ${product.stock}, pedido: ${requestedQty}`,
      )
    }
  }

  if (insufficientItems.length > 0) {
    return { error: `Stock insuficiente: ${insufficientItems.join("; ")}` }
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
      `Stock ya fue descontado para orden ${order.orderNumber}, saltando`,
    )
    return 0
  }

  const bulkOps = order.items.map((item) => ({
    updateOne: {
      filter: { sku: item.product.sku, stock: { $gte: item.product.cantidad } },
      update: { $inc: { stock: -item.product.cantidad } },
    },
  }))

  if (bulkOps.length === 0) return 0

  const result = await Product.bulkWrite(bulkOps)
  console.log(
    `Stock descontado: ${result.modifiedCount}/${bulkOps.length} productos`,
  )

  if (result.modifiedCount < bulkOps.length) {
    console.warn("Algunos productos no tenían stock suficiente al descontar")
  }

  return result.modifiedCount
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
    console.log(`Órdenes expiradas canceladas: ${result.modifiedCount}`)
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
      `Órdenes pendientes canceladas para usuario ${userIdStr}: ${result.modifiedCount}`,
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
      `updateOrderStatus - Orden ${orderNumber} ya pagada, no se degrada a ${status}`,
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

/**
 * Obtiene las órdenes de un usuario con filtro opcional por estado.
 */
export async function getOrdersByUserWithFilter(userId, statusFilter = "") {
  await connectToDatabaseUnix()

  const query = { user: userId }
  if (statusFilter && statusFilter !== "all") {
    query.status = statusFilter
  }

  const orders = await PurchaseOrder.find(query).sort({ orderDate: -1 }).lean()

  return JSON.parse(JSON.stringify(orders))
}

/**
 * Obtiene todas las órdenes con filtros opcionales por estado y usuario.
 */
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
