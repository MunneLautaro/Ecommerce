import { verifyPayment } from "@/actions/payment"
import Link from "next/link"

export default async function FailurePage({ searchParams }) {
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
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-red-500/10 border-red-500/20 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-red-400">Pago rechazado</h1>
        <p className="text-gray-300 text-center">
          El pago de tu orden{" "}
          <span className="font-semibold text-white">{orderNumber}</span> no
          pudo ser procesado. Intentá nuevamente.
        </p>
        <div className="flex gap-3 mt-2">
          <Link
            href="/buy"
            className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
          >
            Reintentar
          </Link>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-white font-semibold transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
