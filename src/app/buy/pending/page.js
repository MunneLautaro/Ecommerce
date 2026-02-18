import { verifyPayment } from "@/actions/payment"
import Link from "next/link"

export default async function PendingPage({ searchParams }) {
  const params = await searchParams
  const orderNumber = params?.order

  const result = orderNumber ? await verifyPayment(orderNumber) : null

  if (result?.status === "approved") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 pt-[100px]">
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-green-500/10 border-green-500/20 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-green-400">¡Pago aprobado!</h1>
          <p className="text-gray-300 text-center">
            Tu orden{" "}
            <span className="font-semibold text-white">
              {result.orderNumber}
            </span>{" "}
            fue procesada correctamente.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 py-10 pt-[100px]">
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-yellow-500/10 border-yellow-500/20 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-yellow-400">Pago pendiente</h1>
        <p className="text-gray-300 text-center">
          Tu orden{" "}
          <span className="font-semibold text-white">{orderNumber}</span> está
          siendo procesada. Te notificaremos cuando se confirme el pago.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
