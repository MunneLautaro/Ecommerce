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

  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu
  const fieldsWithEmojis = requiredFields.filter((field) => {
    emojiRegex.test(product[field])
  })

  if (fieldsWithEmojis.length > 0) {
    return `The product data cannot contain emojis (found in: ${fieldsWithEmojis.join(
      ", "
    )})`
  }

  const re = /[^0-9]/g
  if (re.test(product.price)) return "Price must be numbers"
  if (re.test(product.stock)) return "Stock must be numbers"

  return null
}
