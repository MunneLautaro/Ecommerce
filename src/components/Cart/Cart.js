import { useContext, useEffect, useState } from "react"
import { ShoppingCart } from "react-feather"
import { CartContext } from "@/contexts/CartContext"
import Modal from "../Ui/Modal/Modal"
import ProductCartInfo from "./ProductCartInfo"
import LinkUi from "../Ui/Link/Link"

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useContext(CartContext)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (!cart || !cart.cartProds) {
      setCartCount(0)
      return
    }
    setCartCount(cart.cartProds.length)
  }, [cart])

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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {cartCount === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 gap-3">
            <div className="text-6xl mb-2">🛍️</div>
            <p className="text-lg text-white">Your cart is empty!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col p-10 items-center justify-center gap-4">
              <h1 className="text-white text-2xl font-bold">Your products!</h1>
              <div className="flex flex-wrap justify-center">
                {cart?.cartProds?.map((product) => (
                  <ProductCartInfo key={product.sku} product={product} />
                ))}
              </div>
              <span className="flex font-bold text-lg">
                Total: $
                {cart?.cartProds
                  .reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </div>
            <LinkUi url="/buy">Go to Buy Page</LinkUi>
          </div>
        )}
      </Modal>
    </div>
  )
}
