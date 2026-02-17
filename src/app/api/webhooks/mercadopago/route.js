import { NextResponse } from "next/server"
import { Payment } from "mercadopago"
import { client } from "@/lib/mercadopago"
import PurchaseOrder from "@/models/orderModel"
import { connectToDatabaseUnix } from "../../../../../connectDBUnix"

export async function POST(request) {
  try {
    const body = await request.json()

    // Mercado Pago envía notificaciones de distintos tipos
    // Solo nos interesa cuando se crea/actualiza un pago
    if (body.type !== "payment") {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ error: "No payment ID" }, { status: 400 })
    }

    // Consultar el pago en la API de Mercado Pago
    const payment = new Payment(client)
    const paymentData = await payment.get({ id: paymentId })

    console.log("Webhook - Payment status:", paymentData.status)
    console.log("Webhook - external_reference:", paymentData.external_reference)

    const statusMap = {
      approved: "Payed",
      pending: "Pending",
      in_process: "Pending",
      rejected: "Cancelled",
      cancelled: "Cancelled",
      refunded: "Cancelled",
    }

    const orderStatus = statusMap[paymentData.status] || "Pending"

    // external_reference contiene nuestro orderNumber
    const orderNumber = paymentData.external_reference
    if (!orderNumber) {
      console.warn("Webhook - No external_reference en el pago")
      return NextResponse.json({ received: true }, { status: 200 })
    }

    await connectToDatabaseUnix()

    await PurchaseOrder.findOneAndUpdate(
      { orderNumber },
      {
        status: orderStatus,
        paymentId: String(paymentId),
      },
    )

    console.log(
      `Webhook - Orden actualizada: orderNumber=${orderNumber}, status=${orderStatus}`,
    )

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Error en webhook de Mercado Pago:", error)
    // Siempre devolver 200 para que MP no reintente infinitamente
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
