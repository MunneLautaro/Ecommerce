const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const path = require("path")

let mongod = null
let mongoUri = "mongodb://127.0.0.1:27017/PortableDatabase"

async function connectToDatabase() {
  try {
    const binaryPath = path.resolve("./mongodb-binaries")
    const dbPath = path.resolve("./mongodb-data")

    process.env.MONGOMS_SYSTEM_BINARY = path.join(binaryPath, "mongod.exe")

    if (mongoose.connection.readyState === 1 && mongoUri) {
      return mongoUri
    }

    if (!mongod) {
      mongod = await new MongoMemoryServer({
        instance: {
          dbName: "PortableDatabase",
          dbPath: dbPath,
          storageEngine: "wiredTiger",
          port: 27017,
        },
        binary: {
          version: "8.0.13",
          downloadDir: binaryPath,
          mongodBinaryPath: path.join(binaryPath, "mongod.exe"),
          skipMD5: true,
          autoDownload: false,
        },
        autoStart: false,
      })

      await mongod.start()
      mongoUri = await mongod.getUri()

      console.log("MongoDB Portable URI:", mongoUri)
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        dbName: "PortableDatabase",
      })
      console.log("MongoDB connected with portable, persistent storage.")
    }

    return mongoUri
  } catch (err) {
    console.error("Error connecting to MongoDB:", err)
    throw err
  }
}

export { connectToDatabase }
