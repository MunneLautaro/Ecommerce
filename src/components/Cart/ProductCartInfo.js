import { useContext } from "react"
import { Minus, Plus, Trash2 } from "react-feather"
import { CartContext } from "@/contexts/CartContext"
import CartButton from "./CartButton"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"

export default function ProductCartInfo({ product }) {
  const { dispatchCart } = useContext(CartContext)
  const { addToCart, removeUnitFromCart, deleteProductFromCart } =
    useCart(dispatchCart)

  return (
    <div className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/[0.07] transition-colors">
      {/* Image */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-800">
        <Image
          className="object-cover"
          src={product?.img}
          alt={product?.product}
          fill
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white truncate">
            {product?.product}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">${product?.price} c/u</p>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <CartButton
            onClick={() => removeUnitFromCart(product)}
            disabled={product?.quantity <= 1}
          >
            <Minus className="w-3 h-3" />
          </CartButton>
          <span className="text-xs font-bold text-white min-w-[1rem] text-center">
            {product?.quantity}
          </span>
          <CartButton onClick={() => addToCart(product)}>
            <Plus className="w-3 h-3" />
          </CartButton>
        </div>
      </div>

      {/* Price & delete */}
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <span className="text-sm font-bold text-white">
          ${(product?.price * product?.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => deleteProductFromCart(product)}
          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
          title="Remove"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
