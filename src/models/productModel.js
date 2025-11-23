import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  product: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
})

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema)

//electrodomesticos cod:
/*
  heladera:P001
  microondas:P002
  licuadora:P003
  tostadora:P004
  airFryer:P005

  colores cod:
  blanco:C001
  negro:C002
  azul:C003
  verde:C004
  rojo:C005
  rosa:C006

  modelo:
  M001
  M002
  M003
  M004
  M005

  marca:
  samsung: B001
  samsung: B002
  samsung: B003
  samsung: B004
  samsung: B005
  samsung: B006
  Ej sku:
  producto - color - modelo - samsung
    P001    -  C001   -  M001  -   B001
  */
