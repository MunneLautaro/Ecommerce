"use server"

import { actionProds } from "./serverActionUser"
import { cookies } from "next/headers"
import { decrypt } from "../lib/session"
import { addProduct, modProduct, deleteProduct } from "../controllers/index"

const addProductAction = async (formData) => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value) return { error: "You must login" }, { status: 401 }

  const session = await decrypt(sessionCookie?.value)

  if (!session?.isAdmin) {
    return { error: "Unauthorized" }, { status: 401 }
  }

  const res = await addProduct(formData)

  actionProds()

  return res
}

const modProductAction = async (formData) => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value) return { error: "You must login" }, { status: 401 }

  const session = await decrypt(sessionCookie?.value)

  if (!session?.isAdmin) {
    return { error: "Unauthorized" }, { status: 401 }
  }

  const res = await modProduct(formData)

  actionProds()

  return res
}

const deleteProductAction = async (sku) => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value) return { error: "You must login" }, { status: 401 }

  const session = await decrypt(sessionCookie?.value)

  if (!session?.isAdmin) {
    return { error: "Unauthorized" }, { status: 401 }
  }

  const res = await deleteProduct(sku)

  actionProds()

  return res
}

export { addProductAction, modProductAction, deleteProductAction }
