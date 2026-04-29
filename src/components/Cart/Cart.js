import { useContext, useEffect, useState } from "react"
import { ShoppingCart, ShoppingBag, ArrowRight } from "react-feather"
import { CartContext } from "@/contexts/CartContext"
import CartDrawer from "./CartDrawer"
import ProductCartInfo from "./ProductCartInfo"
import { useRouter } from "next/navigation"
import { reserveStockAction } from "@/actions/reservationActions"
import { SessionContext } from "@/contexts/SessionContext"

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { cart } = useContext(CartContext)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const [sessionState] = useContext(SessionContext)

  const total =
    cart?.cartProds
      ?.reduce((sum, p) => sum + p.price * p.quantity, 0)
      ?.toFixed(2) || "0.00"

  useEffect(() => {
    if (!cart || !cart.cartProds) {
      setCartCount(0)
      return
    }
    setCartCount(cart.cartProds.length)
  }, [cart])

  async function handleGoToCheckout() {
    if (!sessionState?.user?.user) {
      router.push("/login")
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await reserveStockAction(cart.cartProds)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setIsOpen(false)
    router.push(`/buy?order=${result.orderNumber}`)
  }

  return (
    <div id="idDelCarrito">
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 hover:from-violet-500 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/50 hover:scale-105"
      >
        <ShoppingCart className="w-6 h-6 text-white" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {cartCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
            <ShoppingBag className="w-12 h-12 text-gray-600" />
            <p className="text-gray-400 text-base">Your cart is empty</p>
          </div>
        ) : (
          <div className="sm:overflow-y-auto">
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-2 ">
              {cart?.cartProds?.map((product) => (
                <ProductCartInfo key={product.sku} product={product} />
              ))}
            </div>

            <div className="shrink-0 border-t border-white/10 px-5 py-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Total</span>
                <span className="text-lg font-bold text-white">${total}</span>
              </div>

              {error && (
                <p className="text-red-400 text-xs mb-2 text-center">{error}</p>
              )}

              <button
                onClick={handleGoToCheckout}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors text-sm"
              >
                {isLoading ? "Reserving..." : "Go to Checkout"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </CartDrawer>
    </div>
  )
}
