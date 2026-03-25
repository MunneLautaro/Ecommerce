import "./globals.css"
import NavBar from "../components/Ui/NavBar/NavBar"
import { ToastContainer } from "react-toastify"
import { cookies } from "next/headers"
import { decrypt } from "../lib/session"
import Providers from "@/providers/Providers"

export const metadata = {
  title: "Bob's Store",
  description: "My first Next.js app",
}

async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value || null
  const session = token ? await decrypt(token) : null
  return session
}

export default async function RootLayout({ children }) {
  const session = await getSession()
  const initialSessionData = session
    ? {
        session: true,
        user: {
          user: session.username,
          isAdmin: session.isAdmin,
          userId: session.userId,
        },
      }
    : { session: false, user: null }

  return (
    <html lang="en">
      <body className="antialiased">
        <Providers
          key={session?.userId || "no-session"}
          initialSessionData={initialSessionData}
        >
          <NavBar />
          <div className="pt-[90px]">{children}</div>
          <ToastContainer theme="dark" position="bottom-left" />
        </Providers>
      </body>
    </html>
  )
}
