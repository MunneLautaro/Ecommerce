"use server"

import { revalidateTag } from "next/cache"

const actionUser = async () => {
  revalidateTag("users")
}

const actionProds = async () => {
  revalidateTag("products")
}

const actionAlert = async () => {
  revalidateTag("alert")
}

const actionItem = async () => {
  revalidateTag("items")
}

export { actionUser, actionProds, actionAlert, actionItem }
