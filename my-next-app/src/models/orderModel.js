import mongoose from "mongoose";

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
        img: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        color: { type: String, required: true },
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
});

module.exports =
  mongoose.models.PurchaseOrder ||
  mongoose.model("PurchaseOrder", purchaseOrderSchema);
