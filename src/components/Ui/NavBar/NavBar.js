import { getSession } from "@/lib/session"
import NavBarClient from "./NavBarClient"
import SessionWatcher from "../../SessionWatcher/SessionWatcher"

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
      <SessionWatcher user={user} />
      <NavBarClient user={user} />
    </>
  )
}
