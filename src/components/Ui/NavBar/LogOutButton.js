import { useContext } from "react"
import { logout } from "../../../actions/index"
import { SessionContext } from "@/contexts/SessionContext"
import { CartContext } from "@/contexts/CartContext"
import { LogOut } from "react-feather"
import Link from "next/link"

export default function LogOutButton({ username, isAdmin }) {
  const [, dispatchSession] = useContext(SessionContext)
  const { dispatchCart } = useContext(CartContext)
  const handleLogout = () => {
    dispatchSession({ type: "CLEAR_SESSION" })
    dispatchCart({ type: "CLEAR_CART" })
    logout()
  }

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <h2
        className={`${
          isAdmin ? "text-violet-400" : "text-yellow-500"
        } font-black font-mono text-3xl hover:scale-110 transition-all duration-300 hover:underline`}
      >
        <Link href="/profile">{username}</Link>
      </h2>
      <button
        className="bg-gray-300 hover:bg-gray-600 transition-colors duration-150 text-gray-900 p-1 rounded"
        onClick={() => {
          handleLogout()
        }}
        aria-label={`Logout ${username}`}
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  )
}
