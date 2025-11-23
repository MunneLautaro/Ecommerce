"use server"

import { actionProds } from "./serverActionUser"
import { requireAuth } from "../lib/session"
import { addProduct, modProduct, deleteProduct } from "../controllers/index"

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

export { addProductAction, modProductAction, deleteProductAction }
