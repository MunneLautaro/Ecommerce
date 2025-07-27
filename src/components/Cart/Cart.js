"use client"
import { useState } from "react"
import ModalCart from "./ModalCart"
import { Trash2, ShoppingCart } from "lucide-react"

export default function Cart({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
      >
        <ShoppingCart color="red" size={48} />
      </button>

      <ModalCart
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <div className="text-center w-56">
          <Trash2 color="red" size={48} className="mx-auto text-red-500" />
        </div>
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800"> Confirm delete</h3>
        </div>
      </ModalCart>
    </>
  )
}
