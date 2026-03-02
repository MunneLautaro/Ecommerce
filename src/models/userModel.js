import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  md5: { type: String },
  sha1: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String },
  lastSession: { type: Date, default: Date.now },
  activeSession: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  device: { type: String, required: true },
  personalInfo: {
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    deliveryAddress: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
  },
})

export default mongoose.models["User"] || mongoose.model("User", userSchema)
