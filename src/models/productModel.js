import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  product: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
})

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema)
