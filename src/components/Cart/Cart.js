import { useContext, useState } from "react"
import { ShoppingCart } from "react-feather"
import { CartContext } from "@/contexts/CartContext"
import Modal from "../Ui/Modal/Modal"
import ProductCartInfo from "./ProductCartInfo"

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useContext(CartContext)

  const cartProducts = cart.cartProds || []

  return (
    <div id="idDelCarrito">
      <button onClick={() => setIsOpen(true)}>
        <ShoppingCart />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col p-10 items-center justify-center gap-4">
            <h1 className="text-white text-2xl font-bold">Your products!</h1>
            <div className="flex flex-wrap justify-center">
              {cartProducts.map((product) => (
                <ProductCartInfo key={product.sku} product={product} />
              ))}
            </div>
            <span className="flex font-bold text-lg">
              Total: $
              {cartProducts
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        )}
      </Modal>
    </div>
  )
}
