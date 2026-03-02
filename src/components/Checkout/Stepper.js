"use client"
import CheckoutForm from "./CheckoutForm"
import CheckOut from "./CheckOut"
import { CheckOutContext } from "@/contexts"
import { useContext } from "react"

export default function Stepper() {
  const [checkOutState, dispatchCheckOut] = useContext(CheckOutContext)
  return (
    <div className="px-4 pb-10">
      <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>
      {checkOutState.isFormOpen && <CheckoutForm />}
      {!checkOutState.isFormOpen && <CheckOut />}
    </div>
  )
}
