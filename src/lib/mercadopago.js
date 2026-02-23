import "server-only"
import { MercadoPagoConfig, Preference, PaymentRefund } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
})

export { client, Preference, PaymentRefund }
