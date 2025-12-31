"use server"

import { actionProds } from "./serverActionUser"
import { requireAuth } from "../lib/session"
import {
  addProduct,
  modProduct,
  deleteProduct,
  getProducts,
} from "../controllers/index"

const addProductAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const res = await addProduct(formData)

  actionProds()

  return res
}

const modProductAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const res = await modProduct(formData)

  actionProds()

  return res
}

const deleteProductAction = async (sku) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const res = await deleteProduct(sku)

  actionProds()

  return res
}

const getProductsAction = async (sku) => {
  const res = await getProducts(sku)

  actionProds()

  return res
}

export {
  addProductAction,
  modProductAction,
  deleteProductAction,
  getProductsAction,
}
