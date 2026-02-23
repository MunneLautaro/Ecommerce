import { NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"
import { createSession } from "@/lib/session"
import User from "@/models/userModel"
import { connectToDatabaseUnix } from "../../../../../connectDBUnix"

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export async function POST(request) {
  try {
    const { token } = await request.json()

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { sub: googleId, email, name } = payload

    await connectToDatabaseUnix()

    let user = await User.findOne({ googleId })

    if (!user) {
      user = await User.create({
        user: email.split("@")[0],
        googleId,
        email,
        name,
        md5: "google-auth",
        sha1: "google-auth",
        device: "google-signin",
        isAdmin: false,
        activeSession: true,
        lastSession: new Date(),
      })
    } else {
      user.activeSession = true
      user.lastSession = new Date()
      await user.save()
    }

    await createSession(user._id.toString(), user.user, user.isAdmin)

    return NextResponse.json({
      success: true,
      user: {
        user: user.user,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    console.error("Error in Google authentication:", error)
    return NextResponse.json(
      { success: false, error: "Error al autenticar con Google" },
      { status: 401 },
    )
  }
}
