"use client"

import { usePathname } from "next/navigation"
import { useContext, useState } from "react"
import { Menu, X } from "react-feather"
import { adminRoutes } from "../../../app/routes"
import { userRoutes } from "../../../app/routes"
import Title from "./Title"
import LogOutButton from "./LogOutButton"
import Link from "../../Ui/Link/Link"
import Cart from "@/components/Cart/Cart"
import { SessionContext } from "@/contexts/SessionContext"
import { LogIn } from "react-feather"

export default function NavBar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sessionState] = useContext(SessionContext)

  const links = sessionState?.user?.user
    ? sessionState?.user?.isAdmin && adminRoutes[pathname]?.length > 0
      ? adminRoutes[pathname]
      : userRoutes[pathname] || []
    : pathname !== "/"
      ? [{ label: "Catalog", url: "/" }]
      : []

  return (
    <>
      <div className="flex bg-[#424242] shadow-md justify-between items-center w-full max-w-full h-[90px] fixed top-0 px-4 md:px-6 z-10 overflow-hidden">
        <div className="min-w-0 flex-1 relative left-0 top-0 ">
          <Title />
        </div>

        <div className="hidden md:flex items-center justify-center gap-4">
          {links.map((link) => (
            <Link key={link.label} id={link.label} url={link.url}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex flex-1 items-center justify-end gap-4">
          {pathname !== "/buy" && pathname !== "/login" && <Cart />}
          {sessionState?.user?.user ? (
            <>
              <LogOutButton
                username={sessionState?.user?.user}
                isAdmin={sessionState?.user?.isAdmin}
              />
            </>
          ) : pathname !== "/login" ? (
            <Link url={"/login"} className="flex items-center gap-1">
              <LogIn className="w-7 h-7 hover:scale-110 hover:text-violet-700 transition-all duration-300" />
            </Link>
          ) : null}
        </div>

        <button
          className="md:hidden shrink-0 p-2 text-white transition-all duration-300 hover:scale-110"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`
          md:hidden fixed top-[90px] left-0 right-0 bg-[#2c2c2c] border-t border-[#5a5a5a] z-20 px-4 py-3 space-y-3 shadow-lg
          transition-all duration-300 ease-in-out origin-top
          ${isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col gap-3">
          {links.map((item) => (
            <Link
              key={item.label}
              id={item.label}
              url={item.url}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          {sessionState?.user?.user ? (
            <>
              <Cart />
              <LogOutButton
                username={sessionState?.user?.user}
                isAdmin={sessionState?.user?.isAdmin}
              />
            </>
          ) : pathname !== "/login" ? (
            <Link url={"/login"} onClick={() => setIsMenuOpen(false)}>
              <LogIn className="w-4 h-4 hover:scale-110 hover:text-violet-700 transition-all duration-300" />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  )
}
