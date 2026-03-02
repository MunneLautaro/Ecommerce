"use client"

import { useContext, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { CartContext } from "@/contexts/CartContext"
import { createPreference } from "@/actions/payment"
import { CheckOutContext } from "@/contexts"

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: "es-AR" })

export default function MercadoPagoCheckout() {
  const { cart } = useContext(CartContext)
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const [preferenceId, setPreferenceId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [checkOutState] = useContext(CheckOutContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  const total =
    cart?.cartProds
      ?.reduce((sum, p) => sum + p.price * p.quantity, 0)
      ?.toFixed(2) || "0.00"

  const handleCheckout = async () => {
    if (!orderNumber) {
      setError(
        "No reservation found. Please go back to your cart and try again.",
      )
      return
    }

    setLoading(true)
    setError(null)

    const result = await createPreference(
      orderNumber,
      checkOutState?.userData,
      checkOutState?.saveForLater,
    )

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    setPreferenceId(result.preferenceId)
    setLoading(false)
  }

  if (!mounted) return null

  if (!orderNumber) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p>No active reservation. Please go back to your cart.</p>
      </div>
    )
  }

  if (!cart?.cartProds?.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="w-full space-y-3">
        {cart.cartProds.map((product) => (
          <div
            key={product.sku}
            className="flex justify-between items-center p-3 rounded-lg bg-white/5"
          >
            <div>
              <p className="text-white font-medium">{product.product}</p>
              <p className="text-sm text-gray-400">
                x{product.quantity} — ${product.price} c/u
              </p>
            </div>
            <p className="text-white font-semibold">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <span className="text-gray-400">Total</span>
          <span className="text-xl font-bold text-white">${total}</span>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {!preferenceId ? (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed text-white font-semibold transition-colors"
        >
          {loading ? "Generating payment..." : "Pay with Mercado Pago"}
        </button>
      ) : (
        <div className="w-full">
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  )
}
