import { useState, useContext } from "react"
import { Minus, Plus, Trash2 } from "react-feather"
import { CartContext } from "@/contexts/CartContext"
import CartButton from "./CartButton"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"

export default function ProductCartInfo({ product }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { dispatchCart } = useContext(CartContext)
  const { addToCart, removeUnitFromCart, deleteProductFromCart } =
    useCart(dispatchCart)

  return (
    <div className="relative flex flex-col bg-white text-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-[180px] group m-2">
      <div className="relative h-24 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          src={product?.img}
          alt={product?.product}
          fill
          unoptimized
        />
        <div className="absolute top-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
          x{product?.quantity}
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h2 className="font-bold text-sm text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product?.product}
        </h2>

        <div className="mb-2">
          <p
            className={`text-xs text-gray-600 ${
              isExpanded ? "" : "truncate"
            } cursor-pointer hover:text-gray-900 transition-colors`}
            onClick={() => setIsExpanded(!isExpanded)}
            title="Click para expandir"
          >
            <span className="font-medium">Precio:</span> ${product?.price}
          </p>
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <CartButton
            onClick={() => removeUnitFromCart(product)}
            disabled={product?.quantity <= 1}
          >
            <Minus className="w-3 h-3 text-gray-700" />
          </CartButton>

          <span className="font-semibold text-sm text-gray-800 min-w-[1.5rem] text-center">
            {product?.quantity}
          </span>
          <CartButton onClick={() => addToCart(product)}>
            <Plus className="w-3 h-3 text-gray-700" />
          </CartButton>

          <button
            onClick={() => deleteProductFromCart(product)}
            className="ml-auto text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
            title="Eliminar producto"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">Subtotal:</span>
            <span className="text-sm font-bold text-gray-900">
              ${(product?.price * product?.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
