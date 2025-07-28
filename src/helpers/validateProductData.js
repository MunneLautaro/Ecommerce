export function validateProductData(product) {
  const requiredFields = [
    "product",
    "color",
    "model",
    "brand",
    "description",
    "img",
    "price",
    "stock",
  ]

  const missingFields = requiredFields.filter((field) => !product[field])
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`
  }

  const re = /[^0-9]/g
  if (re.test(product.price)) return "Price must be numbers"
  if (re.test(product.stock)) return "Stock must be numbers"

  return null
}
