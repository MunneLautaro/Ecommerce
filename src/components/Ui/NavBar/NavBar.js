"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "react-feather"
import { adminRoutes } from "../../../app/routes"
import Title from "./Title"
import LogOutButton from "./LogOutButton"
import Link from "../../Ui/Link/Link"
import Cart from "@/components/Cart/Cart"

export default function NavBar({ username, isAdmin }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links =
    username && isAdmin && adminRoutes[pathname]?.length > 0
      ? adminRoutes[pathname]
      : pathname !== "/"
      ? [{ label: "Catalog", url: "/" }]
      : []

  return (
    <>
      <div className="flex bg-[#424242] justify-between items-center w-full h-[90px] fixed top-0 px-4 md:px-6 z-10">
        <Title />
        <div className="hidden md:flex items-center gap-4">
          {links.map((item) => (
            <Link
              key={item.label}
              id={item.label}
              url={item.url}
              text={item.label}
            />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {username ? (
            <>
              <Cart />
              <LogOutButton username={username} isAdmin={isAdmin} />
            </>
          ) : (
            <Link url={"/login"} text={"Login"} />
          )}
        </div>

        <button
          className="md:hidden p-2 text-white"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed top-[90px] left-0 right-0 bg-[#2c2c2c] border-t border-[#5a5a5a] z-20 px-4 py-3 space-y-3 shadow-lg">
          <div className="flex flex-col gap-3">
            {links.map((item) => (
              <Link
                key={item.label}
                id={item.label}
                url={item.url}
                text={item.label}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {username ? (
              <>
                <Cart />
                <LogOutButton username={username} isAdmin={isAdmin} />
              </>
            ) : (
              <Link
                url={"/login"}
                text={"Login"}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
