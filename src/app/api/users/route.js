import { NextResponse } from "next/server"
import {
  addUser,
  getUsers,
  deleteUser,
  modifyUser,
} from "../../../controllers/index"

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

export async function POST(req) {

  const { user, md5, sha1, userAgent } = await req.json()

  const result = await addUser(user, md5, sha1, userAgent)

  if (result?.error) {
    return NextResponse.json(
      { error: result?.error },
      { status: result?.status || 500 }
    )
  }

  return NextResponse.json(
    { message: result?.success },
    { status: result?.status }
  )
}

export async function DELETE(req) {
  const r = await req.json()
  const { user } = r

  if (!user) {
    return NextResponse.json({ error: "Missing user field" }, { status: 400 })
  }

  const result = await deleteUser(user)

  if (result?.error) {
    return NextResponse.json(
      { error: result?.error },
      { status: result?.status || 500 }
    )
  }

  return NextResponse.json(
    { message: result?.success },
    { status: result?.status }
  )
}

export async function PUT(req) {
  const r = await req.json()
  const { currentUsername, newUsername, newPassword } = r
  const device = req.headers.get("user-agent") || ""

  if (!currentUsername || !newUsername || !newPassword) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const result = await modifyUser(
    currentUsername,
    newUsername,
    newPassword,
    device
  )

  if (result?.error) {
    return NextResponse.json(
      { error: result?.error },
      { status: result?.status || 500 }
    )
  }

  return NextResponse.json(
    { message: result?.success },
    { status: result?.status }
  )
}
