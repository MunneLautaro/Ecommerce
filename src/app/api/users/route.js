import { NextResponse } from "next/server"
import { getUsers } from "../../../controllers/index"

export async function GET(req) {
  const response = await getUsers()

  if (response.error) {
    return NextResponse.json(
      { error: response?.error },
      { status: response?.status || 500 }
    )
  }

  return NextResponse.json(
    { users: response?.users },
    { status: response?.status }
  )
}
