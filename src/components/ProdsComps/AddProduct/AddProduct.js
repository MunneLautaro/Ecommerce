"use client"
import ProductCard from "../../ProductCard/ProductCard"
import Select from "../Select/Select"
import { toast } from "react-toastify"
import MyInput from "../../Ui/MyInput/MyInput"
import MyButton from "../../Ui/MyButton/MyButton"
import { useState, useEffect } from "react"
import { addProduct } from "@/actions/product"

export default function AddProduct() {
  const [response, setResponse] = useState(null)
  const [product, setProduct] = useState({
    product: "",
    img: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    price: "",
    stock: "",
  })

  useEffect(() => {
    if (!response) return
    if (response?.message) {
      toast.success(response?.message)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  return (
    <div className="flex flex-col items-center px-4 justify-center">
      <h1 className="text-2xl font-semibold text-yellow-500 my-6">
        ¡Add a new product!
      </h1>

      <div className="flex flex-col md:flex-row mt-6 gap-10 w-full max-w-5xl">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const form = new FormData(e.target)
            const modResponse = await addProduct(form)
            setResponse(modResponse)
            setProduct({
              product: "",
              img: "",
              description: "",
              brand: "",
              model: "",
              color: "",
              price: "",
              stock: "",
            })
          }}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
          <Select
            value={product?.brand}
            elements={[
              "Samsung",
              "Phillips",
              "Lg",
              "Philco",
              "Electrolux",
              "Panasonic",
            ]}
            type="Brand"
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />

          <Select
            value={product?.product}
            elements={[
              "Refrigerator",
              "Microwaves",
              "Blender",
              "Toaster",
              "Airfryer",
            ]}
            type="Product"
            onChange={(e) =>
              setProduct({ ...product, product: e.target.value })
            }
          />

          <Select
            value={product?.color}
            elements={[
              "White",
              "Black",
              "Blue",
              "Green",
              "Red",
              "Pink",
              "Gray",
            ]}
            type="Color"
            onChange={(e) => setProduct({ ...product, color: e.target.value })}
          />

          <Select
            value={product.model}
            elements={["A001", "A002", "A003", "A004", "A005"]}
            type="Model"
            onChange={(e) => setProduct({ ...product, model: e.target.value })}
            required
          />

          <MyInput
            name={"img"}
            value={product?.img}
            placeHolder="img.jpg"
            onChange={(e) => setProduct({ ...product, img: e.target.value })}
          />

          <MyInput
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
                setProduct({ ...product, img: webpDataUrl })

                e.target.value = null
              }
              img.src = URL.createObjectURL(file)
            }}
          />

          <MyInput
            name={"description"}
            value={product?.description || ""}
            placeHolder="Description"
            onChange={(e) =>
              setProduct({ ...product, description: e?.target?.value })
            }
            required={true}
          />

          <MyInput
            name={"price"}
            value={product?.price || ""}
            placeHolder="Price"
            onChange={(e) =>
              setProduct({ ...product, price: e?.target?.value })
            }
            required={true}
          />

          <MyInput
            name={"stock"}
            value={product?.stock || ""}
            placeHolder="Stock"
            onChange={(e) =>
              setProduct({ ...product, stock: e?.target?.value })
            }
            required={true}
          />

          <MyButton type="submit" text="Add product" />
        </form>

        <div className="w-full md:w-1/2">
          <ProductCard product={product} display />
        </div>
      </div>
    </div>
  )
}
