"use server"

import { requireAuth } from "../lib/session"
import {
  addItemInCategorie,
  modifyCategorie,
  getItems,
  deleteCategorie,
  getItemsByType,
} from "../controllers/index"

const getCategorieItemsAction = async () => {
  const categories = await getItems()
  return categories
}

const getItemsByTypeAction = async () => {
  const categories = await getItemsByType()
  return categories
}

const addCategorieItemAction = async (formData) => {
  const type = formData?.type
  const value = formData?.value

  if (!type || !value) {
    return { error: "Type and Value are required" }
  }

  const { authorized, error } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const res = await addItemInCategorie(type, value)

  return res
}

const modifyCategorieAction = async (type, oldValue, newValue) => {
  if (!type || !oldValue || !newValue) {
    return { error: "Type, Old Value and New Value are required" }
  }

  const { authorized, error } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const res = await modifyCategorie(type, oldValue, newValue)

  return res
}

const deleteCategorieItemAction = async (type, value) => {
  if (!type || !value) {
    return { error: "Type and Value are required" }
  }
  const { authorized, error } = await requireAuth({
    requireAdmin: true,
  })
  if (!authorized) {
    return { error }
  }
  const res = await deleteCategorie(type, value)
  return res
}

export {
  addCategorieItemAction,
  modifyCategorieAction,
  getCategorieItemsAction,
  deleteCategorieItemAction,
  getItemsByTypeAction,
}
