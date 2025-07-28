"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { adminRoutes } from "../../routes"
import Title from "./Title"
import LogOutButton from "./LogOutButton"
import MyLink from "../Ui/MyLink"

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
            <MyLink
              key={adminR.label}
              id={adminR.label}
              url={adminR.url}
              text={adminR.label}
            />
          ))
        ) : pathname !== "/catalog" ? (
          <MyLink url="/catalog" text={"Catalog"} />
        ) : null}
        <div className="m-[15px] flex">
          {session ? (
            <LogOutButton
              username={session?.username}
              isAdmin={session.isAdmin}
            />
          ) : (
            <MyLink url={"/login"} text={"Login"} />
          )}
        </div>
      </div>
    </>
  )
}
