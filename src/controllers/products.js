import { connectWithSSH } from "../dbMongo"
import Product from "../models/productModel"
import { validateProductData } from "@/helpers/validateProductData"
import { createSku } from "@/helpers/createSku"

const findSku = async (sku) => {
  try {
    await connectWithSSH()
    let prod = await Product.findOne({ sku })
    if (!prod) {
      return { error: "Product not found", status: 404 }
    }
    return { product: prod, status: 200 }
  } catch (error) {
    return { error: error, status: 500 }
  }
}

const createProduct = async (data, sku) => {
  try {
    await connectWithSSH()
    const newProduct = new Product({
      sku,
      product: data.product,
      img: data.img,
      description: data.description,
      brand: data.brand,
      model: data.model,
      color: data.color,
      price: data.price,
      stock: data.stock,
    })

    await newProduct.save()
  } catch (error) {
    return { error: error, status: 500 }
  }
}

const getProducts = async () => {
  try {
    await connectWithSSH()
  } catch (error) {
    return { error: "There was an error connecting to DB", status: 424 }
  }
  const result = await Product.find({})
  if (!result) {
    return { error: "There's no products yet", status: 404 }
  }
  const plainProducts = JSON.parse(JSON.stringify(result))
  return { products: plainProducts, status: 200 }
}

const addProduct = async (data) => {
  //checkear los campos
  await connectWithSSH()
  const validationError = validateProductData(data)
  if (validationError) {
    return { error: validationError, status: 400 }
  }

  const sku = createSku(data.product, data.color, data.model, data.brand)
  if (!sku) {
    return { error: "Wrong product data", status: 400 }
  }

  let product = await findSku(sku)
  if (!product?.error) {
    return { error: "The product already exists", status: 409 }
  }

  await createProduct(data, sku)

  return {
    success: `The product ${data.product} was successfully registered`,
    status: 201,
  }
}

export { getProducts, addProduct }
