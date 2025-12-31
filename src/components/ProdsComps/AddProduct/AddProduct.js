"use client"
import ProductCard from "../../ProductCard/ProductCard"
import Select from "../Select/Select"
import { toast } from "react-toastify"
import Input from "../../Ui/Input/Input"
import Button from "../../Ui/Button/Button"
import { useState, useEffect, useContext } from "react"
import { addProductAction } from "@/actions/product"
import { ProductContext } from "../../../contexts/ProductContext"
import LinkUi from "@/components/Ui/Link/Link"
import { useFetchItems } from "@/hooks/fetchItems"
import { ItemContext, ItemDispatchContext } from "../../../contexts/ItemContext"

export default function AddProduct() {
  const [productInfo, disptachProductInfo] = useContext(ProductContext)
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [colors, setColors] = useState([])
  const [models, setModels] = useState([])
  const itemsState = useContext(ItemContext)
  const dispatchItems = useContext(ItemDispatchContext)
  const { fetchItemsByType } = useFetchItems(dispatchItems)

  useEffect(() => {
    fetchItemsByType("brand")
    fetchItemsByType("productname")
    fetchItemsByType("color")
    fetchItemsByType("model")
  }, [])

  useEffect(() => {
    setBrands(itemsState?.brands || [])
    setProducts(itemsState?.products || [])
    setColors(itemsState?.colors || [])
    setModels(itemsState?.models || [])
  }, [
    itemsState?.brands,
    itemsState?.products,
    itemsState?.colors,
    itemsState?.models,
  ])

  let formCompleted = false
  const requiredFields = [
    "brand",
    "product",
    "color",
    "model",
    "description",
    "price",
    "stock",
  ]

  formCompleted = requiredFields.every((field) => {
    const value = productInfo?.form[field]
    return value !== null && value !== undefined && value !== ""
  })

  useEffect(() => {
    if (!productInfo.response) return
    if (productInfo.response?.success) {
      toast.success(productInfo?.response?.success)
    } else {
      toast.error(productInfo?.response?.error)
    }
  }, [productInfo?.response])

  const areEnoughItems =
    brands?.length >= 1 &&
    products?.length >= 1 &&
    colors?.length >= 1 &&
    models?.length >= 1

  return (
    <div
      data-testid="AddProductComponent"
      className="flex flex-col items-center px-4 justify-center"
    >
      <h1 className="text-2xl font-semibold text-yellow-500 my-6">
        ¡Add a new product!
      </h1>

      {areEnoughItems ? (
        <div className="flex flex-col md:flex-row mt-6 gap-10 w-full max-w-5xl bg-[#424242] p-3 rounded-lg shadow-2xl border border-yellow-500">
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const addResponse = await addProductAction(productInfo?.form)
              console.log({ productInfo })
              disptachProductInfo({ type: "CLEAR_FORM" })
              disptachProductInfo({
                type: "SET_RESPONSE",
                payload: addResponse,
              })
              console.log(addResponse)
            }}
            className="flex flex-col gap-4 w-full md:w-1/2"
          >
            <Select
              value={productInfo?.form?.brand}
              elements={brands}
              type="Brand"
              onChange={(e) => {
                const selectedBrand = brands.find(
                  (brand) => brand.value === e.target.value
                )
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { brand: selectedBrand },
                })
              }}
            />

            <Select
              value={productInfo?.form?.product?.value ?? ""}
              elements={products}
              type="Product"
              onChange={(e) => {
                const selectedProduct = products.find(
                  (product) => product.value === e.target.value
                )
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { product: selectedProduct },
                })
              }}
              required
            />
            <Select
              value={productInfo?.form?.color?.value ?? ""}
              elements={colors}
              type="Model"
              onChange={(e) => {
                const selectedColor = colors.find(
                  (color) => color.value === e.target.value
                )
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { color: selectedColor },
                })
              }}
              required
            />

            <Select
              value={productInfo?.form?.model?.value ?? ""}
              elements={models}
              type="Model"
              onChange={(e) => {
                const selectedModel = models.find(
                  (model) => model.value === e.target.value
                )
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { model: selectedModel },
                })
              }}
              required
            />

            <Input
              name={"img"}
              value={productInfo?.form?.img}
              placeHolder="img.jpg"
              onChange={(e) => {
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { img: e.target.value },
                })
              }}
            />

            <Input
              dataTestId="imgFile"
              name={"img"}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={async (e) => {
                const file = e.target.files[0]
                if (!file) return

                const img = new window.Image()
                img.onload = () => {
                  const canvas = document.createElement("canvas")
                  canvas.width = img.width
                  canvas.height = img.height
                  const ctx = canvas.getContext("2d")
                  ctx.drawImage(img, 0, 0)

                  const webpDataUrl = canvas.toDataURL("image/webp", 0.8)
                  disptachProductInfo({
                    type: "SET_PRODUCT",
                    payload: { img: webpDataUrl },
                  })

                  e.target.value = null
                }
                img.src = URL.createObjectURL(file)
              }}
            />

            <Input
              name={"description"}
              value={productInfo?.form?.description || ""}
              placeHolder="Description"
              onChange={(e) => {
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { description: e.target.value },
                })
              }}
              required={true}
            />

            <Input
              name={"price"}
              value={productInfo?.form?.price || ""}
              placeHolder="Price"
              onChange={(e) => {
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { price: e.target.value },
                })
              }}
              required={true}
            />

            <Input
              name={"stock"}
              value={productInfo?.form?.stock || ""}
              placeHolder="Stock"
              onChange={(e) => {
                disptachProductInfo({
                  type: "SET_PRODUCT",
                  payload: { stock: e.target.value },
                })
              }}
              required={true}
            />

            <Button
              disabled={!formCompleted}
              type="submit"
              text="Add product"
            />
          </form>

          <div className="w-full md:w-1/2">
            <ProductCard product={productInfo?.form} display />
          </div>
        </div>
      ) : (
        <h2>
          Please add some items before adding a product.{" "}
          <LinkUi url={"/categorieItems"} text={"Go to Categories"}></LinkUi>
        </h2>
      )}
    </div>
  )
}
