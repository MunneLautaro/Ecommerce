import mongoose from "mongoose"

const categorieSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["brand", "color", "productName", "model"],
        message:
          "{VALUE} is not a valid type. Valid types are: brand, color, productName, model",
      },
      trim: true,
    },
    value: {
      type: String,
      required: [true, "Value is required"],
      trim: true,
    },
    prodId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

categorieSchema.index({ type: 1, value: 1 }, { unique: true })

categorieSchema.index({ prodId: 1 }, { unique: true, sparse: true })

export default mongoose.models.Categorie ||
  mongoose.model("Categorie", categorieSchema)
