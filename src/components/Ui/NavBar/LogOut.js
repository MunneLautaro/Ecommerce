"use client"
import { useContext, useEffect } from "react"
import { SessionContext } from "../../../contexts/SessionContext"
import { CartContext } from "../../../contexts/CartContext"
import { logout } from "@/actions"

export default function LogOut() {
  const [, dispatchSession] = useContext(SessionContext)
  const { dispatchCart } = useContext(CartContext)
  useEffect(() => {
    dispatchSession({ type: "CLEAR_SESSION" })
    dispatchCart({ type: "CLEAR_CART" })
    logout()
  }, [])

  return null
}
