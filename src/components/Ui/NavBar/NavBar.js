"use client"

import { usePathname } from "next/navigation"
import { adminRoutes } from "../../../app/routes"
import Title from "./Title"
import LogOutButton from "./LogOutButton"
import Link from "../../Ui/Link/Link"
import Cart from "@/components/Cart/Cart"

export default function NavBar({ username, isAdmin }) {
  const pathname = usePathname()

  return (
    <>
      <div className="flex bg-[#424242] justify-between items-center w-full h-[90px] fixed top-0 overflow-hidden z-10">
        <Title />
        {username && isAdmin && adminRoutes[pathname]?.length > 0 ? (
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
          {username ? (
            <>
              <div className="flex flex-row items-center justify-between">
                <div className="mr-[100px]">
                  <Cart />
                </div>
                <LogOutButton username={username} isAdmin={isAdmin} />
              </div>
            </>
          ) : (
            <Link url={"/login"} text={"Login"} />
          )}
        </div>
      </div>
    </>
  )
}
