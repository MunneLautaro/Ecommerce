// scripts/seed.js
import User from "../src/models/userModel.js"
import { users } from "../data/users/users.js"
import { products } from "../data/products/products.js"
import Product from "../src/models/productModel.js"
//import { connectToDatabase } from "portable-mongodb"
import { connectToDatabaseUnix } from "../connectDBUnix.js"

async function seedDatabase() {
  try {
    await connectToDatabaseUnix("DatabaseUnix")
    const userCount = await User.countDocuments()
    const productCount = await Product.countDocuments()

    if (userCount == 0) {
      await User.insertMany(users)
      console.log("Users seeded successfully.")
    }

    if (productCount == 0) {
      await Product.insertMany(products)
      console.log("Product seeded successfully.")
    }

    process.exit(1)
  } catch (err) {
    console.error("Error while seeding users:", err)
    process.exit(1)
  }
}

seedDatabase()
