import Button from "../../Ui/Button/Button"
import ProductCard from "../../ProductCard/ProductCard"
import Input from "@/components/Ui/Input/Input"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ProductContext } from "../../../contexts/ProductContext"
import { modProductAction } from "../../../actions/product"

export default function ModifyProductForm({ onSubmit }) {
  const [formProduct, dispatchFormProduct] = useContext(ProductContext)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!response) return
    if (response?.success) {
      toast.success(response?.success)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-4xl">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const modedProduct = await modProductAction(formProduct?.form)
            setResponse(modedProduct)
            onSubmit()
          }}
          className="flex flex-col gap-4 w-full lg:w-1/2 min-w-0 bg-[#424242] p-3 rounded-lg shadow-2xl"
        >
          <label className="font-semibold">Image:</label>
          <Input
            name={"img"}
            value={formProduct?.form?.img}
            placeHolder="img.jpg"
            onChange={(e) =>
              dispatchFormProduct({
                type: "SET_PRODUCT",
                payload: { img: e?.target?.value },
              })
            }
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
                dispatchFormProduct({
                  type: "SET_PRODUCT",
                  payload: { img: webpDataUrl },
                })

                e.target.value = null
              }
              img.src = URL.createObjectURL(file)
            }}
          />

          <label className="font-semibold">Description:</label>
          <Input
            name={"description"}
            value={formProduct?.form?.description}
            placeHolder="Description"
            onChange={(e) =>
              dispatchFormProduct({
                type: "SET_PRODUCT",
                payload: { description: e?.target?.value },
              })
            }
            required={true}
          />

          <label className="font-semibold">Price:</label>
          <Input
            name={"price"}
            value={formProduct?.form?.price}
            placeHolder="Price"
            onChange={(e) =>
              dispatchFormProduct({
                type: "SET_PRODUCT",
                payload: { price: e.target.value },
              })
            }
            required={true}
          />

          <label className="font-semibold">Stock:</label>
          <Input
            name={"stock"}
            value={formProduct?.form?.stock}
            placeHolder="Stock"
            onChange={(e) =>
              dispatchFormProduct({
                type: "SET_PRODUCT",
                payload: { stock: e.target.value },
              })
            }
            required={true}
          />

          <Button type="submit" text="Modify product" />
        </form>

        <div className="hidden md:block w-full lg:w-1/2 min-w-0">
          <ProductCard product={formProduct?.form} display />
        </div>
      </div>
    </div>
  )
}
