import { NextResponse } from "next/server"

// Ruta legacy para absorber reintentos de notificaciones viejas de MP
// Las nuevas preferencias usan /api/webhooks/mercadopago
export async function POST() {
  return NextResponse.json({ received: true }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ received: true }, { status: 200 })
}
