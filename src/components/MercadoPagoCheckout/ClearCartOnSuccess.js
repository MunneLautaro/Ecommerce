"use client"

import { useContext, useEffect, useRef } from "react"
import { CartContext } from "@/contexts/CartContext"

export default function ClearCartOnSuccess() {
  const { dispatchCart } = useContext(CartContext)
  const cleared = useRef(false)

  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true
      dispatchCart({ type: "CLEAR_CART" })
    }
  }, [dispatchCart])

  return null
}
