"use client"

import { useContext } from "react"
import { ProductContext } from "../../../../contexts/ProductContext"

export default function ProductButton({ prod, index }) {
  const [formState, dispatchForm] = useContext(ProductContext)

  return (
    <div
      className={`w-full h-full flex items-center ${
        index % 2 === 0
          ? "bg-violet-200 hover:bg-violet-400"
          : "bg-amber-200 hover:bg-amber-400"
      }`}
    >
      <img
        className="h-7 w-7 rounded-full"
        src={prod?.img}
        alt={prod?.product}
      />
      <button
        className="text-black hover:underline w-full h-full"
        onClick={() => {
          dispatchForm({ type: "SET_PRODUCT", payload: prod })
        }}
      >
        {prod?.product}, {prod?.brand}, {prod?.model}, {prod?.color}, $
        {prod?.price}
      </button>
    </div>
  )
}
