import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI no está definida en .env.local")
}

let isConnected = false

export const connectToDatabaseUnix = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log("MongoDB conectado con Mongoose")
  } catch (error) {
    console.error("Error conectando a MongoDB", error)
    throw error
  }
}
