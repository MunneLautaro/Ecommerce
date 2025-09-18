import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function createSession(userId, username, isAdmin) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 horas
  const session = await encrypt({ userId, username, isAdmin })

  let response = NextResponse.next()
  console.log(Object.keys(response))
  console.log("Object keys de nextResponse")

    response.cookies.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
   iexpires: expiresAt,
  })
}

export async function deleteSession() {
  const cookieStore = NextResponse.cookies
  console.log({cookiStore})
  console.log("aca esta el cookieStore")
  cookieStore.delete("session")
}

export async function decrypt(session = "") {
  if (!session) return
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
	  console.log(error)
    console.log("Failed to verify session")
  }
}
