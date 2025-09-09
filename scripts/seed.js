// scripts/seed.js
import User from "../src/models/userModel.js"
import { users } from "../data/users/users.js"
import { connectToDatabase } from "portable-mongodb"

async function seedDatabase() {
  try {
    await connectToDatabase("PortableDatabase")
    const count = await User.countDocuments()
    if (count > 0) {
      console.log("✅ Users already exist, skipping seed.")
      process.exit(1)
    }

    await User.insertMany(users)
    console.log("🌱 Users seeded successfully.")

    process.exit(1)
  } catch (err) {
    console.error("❌ Error while seeding users:", err)
    process.exit(1)
  }
}

seedDatabase()
