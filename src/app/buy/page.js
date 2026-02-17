import { Suspense } from "react"
import MercadoPagoCheckout from "@/components/MercadoPagoCheckout/MercadoPagoCheckout"
import PaymentStatus from "@/components/MercadoPagoCheckout/PaymentStatus"

export default function BuyPage() {
  return (
    <div className="pt-[100px] px-4 pb-10">
      <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>
      <Suspense fallback={null}>
        <PaymentStatus />
      </Suspense>
      <MercadoPagoCheckout />
    </div>
  )
}
