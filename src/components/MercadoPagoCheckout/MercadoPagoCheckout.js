"use client"

import { useContext, useState, useEffect, useRef } from "react"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { CartContext } from "@/contexts/CartContext"
import { createPreference } from "@/actions/payment"

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: "es-AR" })

export default function MercadoPagoCheckout() {
  const { cart } = useContext(CartContext)
  const [preferenceId, setPreferenceId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  const cartSnapshotRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!preferenceId || !cartSnapshotRef.current) return

    const currentFingerprint = JSON.stringify(
      cart?.cartProds?.map((p) => `${p.sku}:${p.quantity}`).sort(),
    )
    if (currentFingerprint !== cartSnapshotRef.current) {
      setPreferenceId(null)
      cartSnapshotRef.current = null
    }
  }, [cart?.cartProds, preferenceId])

  const total =
    cart?.cartProds
      ?.reduce((sum, p) => sum + p.price * p.quantity, 0)
      ?.toFixed(2) || "0.00"

  const handleCheckout = async () => {
    if (!cart?.cartProds?.length) return

    setLoading(true)
    setError(null)

    const items = cart.cartProds.map((p) => ({
      title: p.product,
      quantity: p.quantity,
      price: p.price,
      sku: p.sku,
      img: p.img || "",
    }))

    console.log({ items })
    const result = await createPreference(items)
    console.log({ result })
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    setPreferenceId(result.preferenceId)
    cartSnapshotRef.current = JSON.stringify(
      cart.cartProds.map((p) => `${p.sku}:${p.quantity}`).sort(),
    )
    setLoading(false)
  }

  if (!mounted) {
    return null
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

      {error && <p className="text-red-400 text-sm">{error}</p>}

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
