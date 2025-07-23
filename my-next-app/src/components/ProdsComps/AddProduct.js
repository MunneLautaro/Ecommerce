"use client"
import ProductCard from "../ProductCard/ProductCard"
import Select from "./Select"
import { toast } from "react-toastify"
import MyInput from "../Ui/MyInput"
import MyButton from "../Ui/MyButton"
import { useState } from "react"

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    img: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    price: "",
    amount: "",
  })

  async function addProduct(e) {
    try {
      const res = await fetch("../api/prodController", {
        method: "POST",
        body: JSON.stringify({
          name: product.name,
          img: product.img,
          description: product.description,
          brand: product.brand,
          model: product.model,
          color: product.color,
          price: product.price,
          cantidad: product.amount,
        }),
        headers: { "content-type": "application/json" },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data?.error)
        return
      }

      toast.success(data?.mensaje)
    } catch (error) {
      toast.error("Error al agregar producto.")
    }
  }

  return (
    <div className="flex flex-col items-center px-4 justify-center">
      <h1 className="text-2xl font-semibold text-yellow-500 my-6">
        ¡Add a new product!
      </h1>

      <div className="flex flex-col md:flex-row mt-6 gap-10 w-full max-w-5xl">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addProduct()
            setProduct({
              name: "",
              img: "",
              description: "",
              brand: "",
              model: "",
              color: "",
              price: "",
              amount: "",
            })
          }}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
          <Select
            value={product.brand}
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
            value={product.name}
            elements={[
              "Heladera",
              "Microondas",
              "Licuadora",
              "Tostadora",
              "Airfryer",
            ]}
            type="Electrodoméstico"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          <Select
            value={product.color}
            elements={[
              "Blanco",
              "Negro",
              "Azul",
              "Verde",
              "Rojo",
              "Rosa",
              "Gris",
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
            iValue={product.img}
            iPlaceHolder="img.jpg"
            iOnChange={(e) => setProduct({ ...product, img: e.target.value })}
          />

          <MyInput
            iType="file"
            iAccept="image/png, image/jpeg, image/webp"
            iOnChange={async (e) => {
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
              }
              img.src = URL.createObjectURL(file)
            }}
          />

          <MyInput
            iValue={product.description || ""}
            iPlaceHolder="Description"
            iOnChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            iIsRequired={true}
          />

          <MyInput
            iValue={product.price || ""}
            iPlaceHolder="Price"
            iOnChange={(e) => setProduct({ ...product, price: e.target.value })}
            iIsRequired={true}
          />

          <MyInput
            iValue={product.amount || ""}
            iPlaceHolder="Amount"
            iOnChange={(e) =>
              setProduct({ ...product, amount: e.target.value })
            }
            iIsRequired={true}
          />

          <MyButton bType="submit" bText="Add product" />
        </form>

        <div className="w-full md:w-1/2">
          <ProductCard product={product} display />
        </div>
      </div>
    </div>
  )
}
