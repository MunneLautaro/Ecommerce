import mongoose from "mongoose"

const monitoreoSchema = new mongoose.Schema({
  square: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

module.exports =
  mongoose.models.Monitoreo || mongoose.model("Monitoreo", monitoreoSchema)
