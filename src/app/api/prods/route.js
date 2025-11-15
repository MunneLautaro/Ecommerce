import { NextResponse } from "next/server"
import {
  addProduct,
  getProducts,
  modProduct,
  deleteProduct,
} from "@/controllers/index"
import { cookies } from "next/headers"
import { decrypt } from "../../../lib/session"

export async function GET(req) {
  const response = await getProducts()

  if (response.error) {
    return NextResponse.json(
      { error: response?.error },
      { status: response?.status || 500 }
    )
  }

  return NextResponse.json(
    { products: response?.products },
    { status: response?.status }
  )
}

export async function POST(req) {
  const r = await req.json()
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value)
    return NextResponse.json({ error: "You must login" }, { status: 401 })

  const session = await decrypt(sessionCookie?.value)

  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const result = await addProduct(r)

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
  const data = r?.formData

  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value)
    return NextResponse.json({ error: "You must login" }, { status: 401 })

  const session = await decrypt(sessionCookie?.value)

  console.log({ session })

  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const result = await modProduct(data)

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
  const sku = r?.sku

  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value || null
  const session = token ? await decrypt(token) : null

  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const result = await deleteProduct(sku)

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
