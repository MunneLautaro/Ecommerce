"use client"

import { useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { SessionContext } from "@/contexts/SessionContext"
import { CartContext } from "@/contexts/CartContext"
import { checkSession } from "@/actions/checkSession"

export default function SessionWatcher({ user }) {
  const [, dispatchSession] = useContext(SessionContext)
  const { dispatchCart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    const interval = setInterval(async () => {
      const isValid = await checkSession()
      if (!isValid) {
        dispatchSession({ type: "CLEAR_SESSION" })
        dispatchCart({ type: "CLEAR_CART" })
        router.push("/login")
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [user])

  return null
}
