import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { setCookie, deleteCookie } from "cookies-next"
import { cookies } from "next/headers"

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
  const session = await encrypt({ userId, username, isAdmin })

  await setCookie("session", session, {
    cookies,
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
