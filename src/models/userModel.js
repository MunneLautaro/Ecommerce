import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  md5: { type: String },
  sha1: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String },
  name: { type: String },
  lastSession: { type: Date, default: Date.now },
  activeSession: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  device: { type: String, required: true },
})

export default mongoose.models["User"] || mongoose.model("User", userSchema)
