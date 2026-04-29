"use server"

import { getSession } from "@/lib/session"
import NavBarClient from "./NavBarClient"
import LogOutWrapper from "./LogOutWrapper"

export default async function NavBar() {
  const session = await getSession()

  const user = session
    ? {
        user: session.username,
        isAdmin: session.isAdmin,
        userId: session.userId,
      }
    : null

  return (
    <>
      <NavBarClient user={user} />
      <LogOutWrapper />
    </>
  )
}
