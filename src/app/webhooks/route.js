import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({ received: true }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ received: true }, { status: 200 })
}
