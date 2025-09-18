import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { decrypt, encrypt } from "../src/lib/session"

const protectedRoutes = ["/adminPage", "/addProds"]
const publicRoutes = ["/login", "/catalog"]

export default async function middleware(req) {
  let cookiez = req.cookies
  console.log({ cookiez })
  const res = NextResponse.next()

  res.headers.set("x-middleware-cache", "no-cache")

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookieStore = await cookies()
  cookiez = req.cookies
  console.log({ cookiez })
  console.log("Aca estan las cookies del REQ")
  const cookie = cookieStore.get("session")?.value
  console.log({ cookie })
  console.log("Aca estan las cookies")
  const session = await decrypt(cookie)

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

  console.log(session)

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
    path !== "/catalog"
  ) {
    return NextResponse.redirect(new URL("/catalog", req.nextUrl))
  }

  return res
}
