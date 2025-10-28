"use server"

import { actionProds } from "./serverActionUser"

const addProduct = async (formData) => {
  const brand = formData?.brand
  const product = formData?.product
  const color = formData?.color
  const model = formData?.model
  const img = formData?.img
  const description = formData?.description
  const price = formData?.price
  const stock = formData?.stock

  const res = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/api/prods`, {
    method: "POST",
    body: JSON.stringify({
      brand,
      product,
      color,
      model,
      img,
      description,
      price,
      stock,
    }),
    headers: { "Content-Type": "application/json" },
  })
  actionProds()

  let body = await res.json()
  return body
}

export { addProduct }
