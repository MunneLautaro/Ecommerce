//import { connectToDataBase } from "../dbMongo"
import Product from "../models/productModel"
import { validateProductData } from "@/helpers/validateProductData"
import { createSku } from "@/helpers/createSku"
//import { connectToDataBase } from "../../connectToDatabaseUnix"
import { connectToDatabaseUnix } from "../../connectDBUnix"

const findSku = async (sku) => {
  try {
    await connectToDatabaseUnix()
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
    await connectToDatabaseUnix()
    const newProduct = new Product({
      sku,
      product: data?.product,
      img: data?.img,
      description: data?.description,
      brand: data?.brand,
      model: data?.model,
      color: data?.color,
      price: data?.price,
      stock: data?.stock,
    })

    await newProduct.save()
  } catch (error) {
    return { error: error, status: 500 }
  }
}

const updateProduct = async (data) => {
  try {
    await connectToDatabaseUnix()
    await Product.updateOne(
      { sku: data?.sku },
      {
        img: data?.img,
        description: data?.description,
        price: data?.price,
        stock: data?.stock,
      }
    )
  } catch (error) {
    return { error: error, status: 500 }
  }
}

const getProducts = async () => {
  try {
    await connectToDatabaseUnix()
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
  try {
    await connectToDatabaseUnix()
    const validationError = validateProductData(data)
    if (validationError) {
      return { error: validationError, status: 400 }
    }

    const sku = createSku(data?.product, data?.color, data?.model, data?.brand)

    if (!sku || sku.length !== 11) {
      return { error: "Wrong product data", status: 400 }
    }

    let product = await findSku(sku)
    if (!product?.error) {
      return { error: "The product already exists", status: 409 }
    }

    await createProduct(data, sku)

    return {
      success: `The product ${data?.product} was successfully registered`,
      status: 201,
    }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const modProduct = async (data) => {
  try {
    await connectToDatabaseUnix()
    const product = await Product.findOne({ sku: data?.sku })

    if (!product?.sku) {
      return { error: "The product does not exist", status: 404 }
    }

    if (
      product?.price === data?.price &&
      product?.stock === data?.stock &&
      product?.img === data?.img &&
      product?.description === data?.description
    ) {
      return {
        error: `No changes detected on the product with sku: ${data?.sku}`,
        status: 400,
      }
    }

    const validationError = validateProductData(data)
    if (validationError) {
      return { error: validationError, status: 400 }
    }

    await updateProduct(data)

    return {
      success: `The product ${data?.product} was successfully modified`,
      status: 201,
    }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const deleteProduct = async (sku) => {
  try {
    await connectToDatabaseUnix()
    const product = await Product.findOne({ sku: sku })

    if (!product?.sku) {
      return { error: "The product does not exist", status: 404 }
    }

    await Product.deleteOne({ sku: sku })

    return {
      success: `The product with sku: ${sku} was successfully deleted`,
      status: 200,
    }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

export { getProducts, addProduct, modProduct, deleteProduct }
