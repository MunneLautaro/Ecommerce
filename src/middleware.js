import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { decrypt, encrypt } from "../src/lib/session"
import { getCookie } from "cookies-next"

const protectedRoutes = ["/adminPage", "/addProds"]
const publicRoutes = ["/login", "/"]

export default async function middleware(req) {
  const res = NextResponse.next()

  res.headers.set("x-middleware-cache", "no-cache")

  const path = req?.nextUrl?.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const sessionCookie = await getCookie("session", { cookies })

  if (!sessionCookie) return

  const session = await decrypt(sessionCookie)

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

  if (isPublicRoute && session?.userId && session?.username && path !== "/") {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return res
}
export const config = {
  matcher: protectedRoutes,
}
