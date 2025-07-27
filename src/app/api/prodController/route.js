import { NextResponse } from "next/server"
import { connectWithSSH } from "../../../dbMongo"
import Product from "../../../models/productModel"
import createSku from "../../../helpers/createSku"

await connectWithSSH()

export async function GET(request) {
  const productos = await Product.find({})
  if (!productos) {
    return NextResponse.json(
      { error: "No hay productos registrados" },
      { status: 400 }
    )
  }
  return NextResponse.json({ productos }, { status: 200 })
}

async function encontrarSku(productoSku) {
  try {
    let sku = await Product.findOne({ sku: productoSku })
    return sku
  } catch (error) {
    console.error("Error al conectar o buscar el producto:", error)
    return null
  }
}

export async function POST(request) {
  try {
    const r = await request.json()

    const requiredFields = [
      "name",
      "color",
      "model",
      "brand",
      "description",
      "img",
      "price",
      "cantidad",
    ]
    const missingFields = requiredFields.filter((field) => !r[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      )
    }

    const re = new RegExp("/[^0-9]/g")

    if (re.test(r.price)) {
      return NextResponse.json(
        { error: "Price must be numbers" },
        { status: 400 }
      )
    }

    if (re.test(r.cantidad)) {
      return NextResponse.json(
        { error: "Amount must be numbers" },
        { status: 400 }
      )
    }
    const reqName = r.name
    const reqColor = r.color
    const reqModel = r.model
    const reqBrand = r.brand
    const reqDescription = r.description
    const reqImg = r.img
    const reqPrice = r.price
    const reqCantidad = r.cantidad

    const sku = createSku(reqName, reqColor, reqModel, reqBrand)
    const eProduct = await encontrarSku(sku)

    if (eProduct) {
      return NextResponse.json(
        { error: "The product already exist" },
        { status: 400 }
      )
    }
    if (!sku) {
      return NextResponse.json(
        { mensaje: "Los datos del producto son incorrectos" },
        { status: 400 }
      )
    }
    const newProduct = new Product({
      sku: sku,
      name: reqName,
      img: reqImg,
      description: reqDescription,
      brand: reqBrand,
      model: reqModel,
      color: reqColor,
      price: reqPrice,
      cantidad: reqCantidad,
    })

    await newProduct.save()
    console.log(newProduct)
    return NextResponse.json(
      { mensaje: `Producto registrado: ${reqName}` },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
