import { NextResponse } from "next/server"
import { connectWithSSH } from "../../../dbMongo"
import User from "../../../models/userModel"

export async function POST(request) {
  try {
    await connectWithSSH()
    const r = await request.json()
    const { id, user } = r

    if (!id && !user) {
      return NextResponse.json(
        { error: "Debe enviar al menos un 'id' o un 'user'" },
        { status: 400 }
      )
    }

    const query = id ? { _id: id } : { user }
    const userData = await User.findOne(query)

    if (!userData) {
      return NextResponse.json(
        { error: "El usuario no existe" },
        { status: 404 }
      )
    }

    return NextResponse.json({ userData }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor" },
      { status: 500 }
    )
  }
}
