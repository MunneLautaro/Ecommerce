import { NextResponse } from "next/server"
import { connectWithSSH } from "../../../dbMongo"
import { addUser } from "@/controllers/users"

await connectWithSSH()
