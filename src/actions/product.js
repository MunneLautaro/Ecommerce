import { actionProds } from "./serverActionUser"

const addProduct = async (formData) => {
  const brand = formData.get("brand")
  const product = formData.get("product")
  const color = formData.get("color")
  const model = formData.get("model")
  const img = formData.get("img")
  const description = formData.get("description")
  const price = formData.get("price")
  const stock = formData.get("stock")

  const res = await fetch("http://localhost:3000/api/prods", {
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
