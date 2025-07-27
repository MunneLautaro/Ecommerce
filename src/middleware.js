import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { decrypt, encrypt } from "../src/lib/session"

const protectedRoutes = ["/adminPage", "/addProds"]
const publicRoutes = ["/login", "/catalog"]

export default async function middleware(req) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookieStore = await cookies()
  const cookie = cookieStore.get("session")?.value
  const session = await decrypt(cookie)

  const res = NextResponse.next()

  if (session?.exp) {
    const now = Math.floor(Date.now() / 1000)
    const TWO_HOURS = 2 * 60 * 60
    const THRESHOLD = 30 * 60

    if (session.exp - now < THRESHOLD) {
      const newToken = await encrypt({
        userId: session.userId,
        username: session.username,
        isAdmin: session.isAdmin,
      })

      res.cookies.set("session", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + TWO_HOURS * 1000),
      })
    }
  }

  if (
    isProtectedRoute &&
    (!session?.userId || !session?.username || !session?.isAdmin)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.userId &&
    session?.username &&
    session?.isAdmin &&
    path !== "/catalog"
  ) {
    return NextResponse.redirect(new URL("/catalog", req.nextUrl))
  }

  return res
}
