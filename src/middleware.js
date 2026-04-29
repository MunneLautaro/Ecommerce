import { NextResponse } from "next/server"
import { decrypt, encrypt } from "../src/lib/session"

const protectedRoutes = ["/adminPage", "/prods", "/categorieItems", "/orders"]
const authRequiredRoutes = [
  "/profile",
  "/buy",
  "/adminPage",
  "/prods",
  "/categorieItems",
  "/orders",
]
const publicRoutes = ["/login", "/"]

export default async function middleware(req) {
  const res = NextResponse.next()
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((p) => path.startsWith(p))
  const isAuthRequired = authRequiredRoutes.some((p) => path.startsWith(p))
  const isPublicRoute = publicRoutes.includes(path)

  const sessionCookie = req.cookies.get("session")?.value

  if (!sessionCookie) {
    if (isProtectedRoute || isAuthRequired) {
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    return res
  }

  const session = await decrypt(sessionCookie)

  if (!session) {
    res.cookies.delete("session")
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (session?.exp) {
    const now = Math.floor(Date.now() / 1000)
    const TWO_HOURS = 60 * 60
    const THRESHOLD = 60 * 15

    if (now >= session.exp) {
      res.cookies.delete("session")
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    if (session.exp - now < THRESHOLD) {
      const newExp = now + TWO_HOURS
      const newToken = await encrypt({
        userId: session.userId,
        username: session.username,
        isAdmin: session.isAdmin,
        exp: newExp,
      })

      res.cookies.set("session", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(newExp * 1000),
        path: "/",
      })
    }
  }

  if (isAuthRequired && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (
    isProtectedRoute &&
    (!session?.userId || !session?.username || !session?.isAdmin)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isPublicRoute && session?.userId && path !== "/") {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return res
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/adminPage/:path*",
    "/prods/:path*",
    "/categorieItems/:path*",
    "/orders/:path*",
    "/login",
  ],
}
