import { verifyPayment } from "@/actions/payment"
import Link from "next/link"
import ClearCartOnSuccess from "@/components/MercadoPagoCheckout/ClearCartOnSuccess"

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams
  const orderNumber = params?.order

  const result = orderNumber ? await verifyPayment(orderNumber) : null
  const isVerified = result?.status === "approved"
  const isRefunded = result?.status === "refunded"

  return (
    <div className="flex flex-col items-center gap-4 py-10 pt-[100px]">
      {isRefunded ? (
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-red-500/10 border-red-500/20 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-red-400">
            Purchase Cancelled
          </h1>
          <p className="text-gray-300 text-center">
            Unfortunately, the product is no longer in stock. Your payment has
            been automatically refunded for order{" "}
            <span className="font-semibold text-white">
              {result.orderNumber || orderNumber}
            </span>
            .
          </p>
          {result.error && (
            <p className="text-sm text-red-300 text-center">{result.error}</p>
          )}
          <Link
            href="/"
            className="mt-2 px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      ) : isVerified ? (
        <>
          <ClearCartOnSuccess />
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-green-500/10 border-green-500/20 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-green-400">
              Payment Approved!
            </h1>
            <p className="text-gray-300 text-center">
              Your order{" "}
              <span className="font-semibold text-white">
                {result.orderNumber}
              </span>{" "}
              has been successfully processed.
            </p>
            <Link
              href="/"
              className="mt-2 px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-yellow-500/10 border-yellow-500/20 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-yellow-400">
            Verifying Payment...
          </h1>
          <p className="text-gray-300 text-center">
            We couldn&apos;t confirm your payment yet for order{" "}
            <span className="font-semibold text-white">{orderNumber}</span>. The
            payment may take a few minutes to be confirmed by MercadoPago.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  )
}
