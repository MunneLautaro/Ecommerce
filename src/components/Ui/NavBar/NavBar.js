"use client"

import { usePathname } from "next/navigation"
import { adminRoutes } from "../../../app/routes"
import Title from "./Title"
import LogOutButton from "./LogOutButton"
import Link from "../../Ui/Link/Link"

export default function NavBar({ session }) {
  const pathname = usePathname()

  return (
    <>
      <div className="flex bg-[#424242] justify-between items-center w-full h-[90px] fixed top-0 overflow-hidden z-10">
        <Title />
        {session?.username &&
        session?.isAdmin &&
        adminRoutes[pathname]?.length > 0 ? (
          adminRoutes[pathname].map((adminR) => (
            <Link
              key={adminR?.label}
              id={adminR?.label}
              url={adminR?.url}
              text={adminR?.label}
            />
          ))
        ) : pathname !== "/" ? (
          <Link url="/" text={"Catalog"} />
        ) : null}
        <div className="m-[15px] flex">
          {session ? (
            <LogOutButton
              username={session?.username}
              isAdmin={session.isAdmin}
            />
          ) : (
            <Link url={"/login"} text={"Login"} />
          )}
        </div>
      </div>
    </>
  )
}
