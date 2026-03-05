import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    orderNumber: {
      type: String,
      required: [true, "orderNumber is required"],
      unique: true,
    },
    items: [
      {
        sku: { type: String, required: true },
        cantidad: { type: Number, required: true },
      },
    ],

    cartSnapshot: [
      {
        sku: String,
        name: String,
        title: String,
        price: Number,
        quantity: Number,
        img: String,
        description: String,
        brand: String,
        model: String,
        color: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "totalAmount is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "expiresAt is required"],
    },
  },
  {
    timestamps: true,
  },
)

reservationSchema.index({ expiresAt: 1 })
reservationSchema.index({ userId: 1 })

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema)
