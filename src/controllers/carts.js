import Cart from "../models/cartModel"
import { connectToDatabaseUnix } from "../../connectDBUnix"

const getCartByUserId = async (userId) => {
  try {
    await connectToDatabaseUnix()
    const cart = await Cart.findOne({ userId }).populate("items.productId")
    if (!cart) {
      return { error: "No cart found", data: null }
    }
    return { success: "Cart found", data: cart }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const createOrUpdateCart = async (userId, items) => {
  try {
    await connectToDatabaseUnix()
    let cart = await Cart.findOne({ userId })
    if (cart) {
      cart.items = items
      cart.updatedAt = Date.now()
      await cart.save()
    } else {
      cart = new Cart({ userId, items })
      await cart.save()
    }
    return { success: "Cart created or updated", data: cart }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const clearCart = async (userId) => {
  try {
    await connectToDatabaseUnix()
    const cart = await Cart.findOneAndDelete({ userId })
    if (!cart) {
      return { error: "No cart found to delete", status: 404 }
    }
    return { success: "Cart cleared successfully" }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

export { getCartByUserId, createOrUpdateCart, clearCart }
