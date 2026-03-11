"use client"

import { useState, useContext } from "react"
import AddProduct from "../AddProduct/AddProduct"
import ModifyProduct from "../ModifyProduct/ModifyProduct"
import { ProductContext } from "@/contexts/ProductContext"

export default function ProductTab({ products, items }) {
  const [displayAddProduct, setDisplayAddProduct] = useState(true)
  const [, dispatchForm] = useContext(ProductContext)

  const TABS = [
    {
      label: "Add",
      onClick: () => {
        setDisplayAddProduct(true)
        dispatchForm({ type: "CLEAR_FORM" })
      },
    },
    {
      label: "Modify",
      onClick: () => {
        setDisplayAddProduct(false)
        dispatchForm({ type: "CLEAR_FORM" })
      },
    },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full max-w-sm">
        {TABS.map((tab, index) => (
          <button
            key={tab.label}
            onClick={tab.onClick}
            className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
              (index === 0 ? displayAddProduct : !displayAddProduct)
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full mt-4 flex justify-center">
        {displayAddProduct ? (
          <AddProduct items={items} />
        ) : (
          <ModifyProduct products={products} />
        )}
      </div>
    </div>
  )
}
