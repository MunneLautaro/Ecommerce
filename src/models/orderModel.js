import mongoose from "mongoose"

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  items: [
    {
      product: {
        sku: { type: String, required: true },
        name: { type: String, required: true },
        img: { type: String, default: "" },
        description: { type: String, default: "" },
        brand: { type: String, default: "-" },
        model: { type: String, default: "-" },
        color: { type: String, default: "-" },
        price: { type: Number, required: true },
        cantidad: { type: Number, required: true },
      },
      totalPrice: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Payed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalAmount: { type: Number, required: true },
  preferenceId: { type: String, index: true },
  paymentId: { type: String },
})

export default mongoose.models.PurchaseOrder ||
  mongoose.model("PurchaseOrder", purchaseOrderSchema)
