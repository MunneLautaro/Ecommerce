import mongoose from "mongoose"

//electrodomesticos cod:
/*
  heladera:001
  microondas:002
  licuadora:003
  tostadora:004
  airFryer:005

  colores cod:
  blanco:01
  negro:02
  azul:03
  verde:04
  rojo:05
  rosa:06

  modelo:
  A001
  A002
  A003
  A004
  A005

  marca:
  samsung: M1
  samsung: M2
  samsung: M3
  samsung: M4
  samsung: M5
  samsung: M6

  Ej sku:
  producto - color - modelo - samsung
    001    -  01   -  A001  -   M1
  */

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  cantidad: { type: Number, required: true },
})

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema)
