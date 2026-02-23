"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { verifyPayment } from "@/actions/payment"
import Link from "next/link"

export default function PaymentStatus() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const orderNumber = searchParams.get("order")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status && orderNumber) {
      verifyPayment(orderNumber).then((res) => {
        setResult(res)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [status, orderNumber])

  if (!status) return null

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Verifying payment...</p>
      </div>
    )
  }

  const statusConfig = {
    approved: {
      title: "Payment Approved!",
      message: result?.orderNumber
        ? `Your order ${result.orderNumber} has been successfully processed.`
        : "Your payment has been successfully processed.",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
    },
    failure: {
      title: "Payment Declined",
      message: "The payment could not be processed. Please try again.",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
    pending: {
      title: "Payment Pending",
      message:
        "Your payment is being processed. We'll notify you once it's confirmed.",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
    },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div
      className={`flex flex-col items-center gap-4 p-6 rounded-lg border ${config.bg} max-w-md mx-auto`}
    >
      <h2 className={`text-xl font-bold ${config.color}`}>{config.title}</h2>
      <p className="text-gray-300 text-center">{config.message}</p>
      <Link
        href="/"
        className="mt-2 px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
