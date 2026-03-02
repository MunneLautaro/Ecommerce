"use client"
import { Suspense } from "react"
import MercadoPagoCheckout from "@/components/MercadoPagoCheckout/MercadoPagoCheckout"
import PaymentStatus from "@/components/MercadoPagoCheckout/PaymentStatus"

export default function CheckOut() {
  return (
    <div className="pt-25 px-4 pb-10">
      <Suspense fallback={null}>
        <PaymentStatus />
      </Suspense>
      <MercadoPagoCheckout />
    </div>
  )
}
