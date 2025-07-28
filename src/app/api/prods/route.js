import { NextResponse } from "next/server"
import { addProduct, getProducts } from "@/controllers/index"

export async function GET(req) {
  const response = await getProducts()

  if (response.error) {
    return NextResponse.json(
      { error: response?.error },
      { status: response?.status || 500 }
    )
  }

  return NextResponse.json(
    { users: response?.products },
    { status: response?.status }
  )
}

export async function POST(req) {
  const r = await req.json()
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
