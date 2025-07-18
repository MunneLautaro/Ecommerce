import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  md5: { type: String, required: true },
  sha1: { type: String, required: true },
  lastSession: { type: Date, default: Date.now },
  activeSession: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  device: { type: String, required: true },
})

module.exports = mongoose.models.User || mongoose.model("User", userSchema)
