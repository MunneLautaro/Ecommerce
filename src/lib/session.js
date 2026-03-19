import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { setCookie, deleteCookie } from "cookies-next"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error("SESSION_SECRET is not set")
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function createSession(userId, username, isAdmin) {
  const session = await encrypt({ userId, username, isAdmin })

  await setCookie("session", session, {
    cookies,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function deleteSession() {
  await deleteCookie("session", { cookies })
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

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value) return null

  return await decrypt(sessionCookie.value)
}

export async function requireAuth(options = {}) {
  const session = await getSession()

  if (options.requireSession && !session) {
    return { authorized: false, error: "You must login", session: null }
  }

  if (options.requireAdmin && !session?.isAdmin) {
    if (!session) {
      return { authorized: false, error: "You must login", session: null }
    }
    return { authorized: false, error: "Unauthorized", session: null }
  }

  return { authorized: true, error: null, session }
}
