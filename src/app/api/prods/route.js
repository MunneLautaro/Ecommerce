import { NextResponse } from "next/server"
import { getProducts } from "@/controllers/index"

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
