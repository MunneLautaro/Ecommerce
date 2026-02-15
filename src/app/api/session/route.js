"use server"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/session"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value || null
    const session = token ? await decrypt(token) : null

    if (session) {
      return NextResponse.json({
        session: true,
        user: {
          user: session.username,
          isAdmin: session.isAdmin,
          userId: session.userId,
        },
      })
    }

    return NextResponse.json({ session: false, user: null })
  } catch (error) {
    console.error("Error getting session:", error)
    return NextResponse.json({ session: false, user: null })
  }
}
