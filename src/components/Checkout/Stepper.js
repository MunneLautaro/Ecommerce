"use client"
import CheckoutForm from "./CheckoutForm"
import CheckOut from "./CheckOut"
import { CheckOutContext } from "@/contexts"
import { useContext, useMemo } from "react"

function isFormComplete(userData) {
  const { name, surname, email, phone, deliveryAddress } = userData || {}
  const { street, city, state, postalCode, country } = deliveryAddress || {}
  return [
    name,
    surname,
    email,
    phone,
    street,
    city,
    state,
    postalCode,
    country,
  ].every((v) => v && v.trim() !== "")
}

export default function Stepper() {
  const [checkOutState, dispatchCheckOut] = useContext(CheckOutContext)

  const formComplete = useMemo(
    () => isFormComplete(checkOutState.userData),
    [checkOutState.userData],
  )

  const currentStep = checkOutState.isFormOpen ? 0 : 1

  const goToStep = (step) => {
    if (step === 1 && !formComplete) return
    dispatchCheckOut({ type: "SET_FORM_OPEN", payload: step === 0 })
  }

  return (
    <div className="px-4 pb-10">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>
      {checkOutState.isFormOpen && <CheckoutForm />}
      {!checkOutState.isFormOpen && <CheckOut />}

      <div className="flex justify-center items-center gap-4 mt-8">
        {[0, 1].map((step) => (
          <button
            key={step}
            aria-label={`Step ${step + 1}`}
            disabled={step === 1 && !formComplete}
            onClick={() => goToStep(step)}
            className={`w-4 h-4 rounded-full transition-all duration-200 border-2
              ${
                currentStep === step
                  ? "bg-violet-600 border-violet-600 scale-110"
                  : step === 1 && !formComplete
                    ? "bg-gray-600 border-gray-600 cursor-not-allowed opacity-50"
                    : "bg-transparent border-white/40 hover:border-violet-400 cursor-pointer"
              }`}
          />
        ))}
      </div>
    </div>
  )
}
