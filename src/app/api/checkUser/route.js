import { NextResponse } from "next/server"
import { connectWithSSH } from "@/dbMongo"
import { getUser } from "@/controllers/index"

export async function POST(request) {
  try {
    await connectWithSSH()
    const r = await request.json()
    const { id, user } = r

    const result = await getUser(user, id)

    if (result?.error) {
      return NextResponse.json(
        { error: result?.error },
        { status: result?.status }
      )
    }

    return NextResponse.json({ result: result.user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    )
  }
}
