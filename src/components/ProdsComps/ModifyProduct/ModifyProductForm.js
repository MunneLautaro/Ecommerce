import Button from "../../Ui/Button/Button"
import ProductCard from "../../ProductCard/ProductCard"
import Input from "@/components/Ui/Input/Input"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { ProductContext } from "../../../contexts/ProductContext"
import { modProductAction } from "../../../actions/product"
import { useProduct } from "@/hooks/useProduct"

export default function ModifyProductForm({ onSubmit }) {
  const [formProduct, dispatchFormProduct] = useContext(ProductContext)
  const { setResponse, setProductField } = useProduct(dispatchFormProduct)
  const isProductSelected = !!formProduct?.form?.sku

  useEffect(() => {
    if (!formProduct?.response) return
    if (formProduct?.response?.success) {
      toast.success(formProduct?.response?.success)
    } else {
      toast.error(formProduct?.response?.error)
    }
  }, [formProduct?.response])

  return (
    <div className="flex flex-col items-start w-full">
      {!isProductSelected && (
        <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-200 text-sm">
          👆 Select a product from the table to modify it
        </div>
      )}
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
          <label htmlFor="img-url" className="font-semibold">
            Image:
          </label>
          <Input
            id="img-url"
            name={"img"}
            value={formProduct?.form?.img}
            placeHolder="img.jpg"
            disabled={!isProductSelected}
            onChange={(e) => setProductField("img", e?.target?.value)}
          />

          <Input
            id="img-file"
            dataTestId="imgFile"
            name={"img"}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            disabled={!isProductSelected}
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
                setProductField("img", webpDataUrl)

                e.target.value = null
              }
              img.src = URL.createObjectURL(file)
            }}
          />

          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <Input
            id="description"
            name={"description"}
            value={formProduct?.form?.description}
            placeHolder="Description"
            disabled={!isProductSelected}
            onChange={(e) => setProductField("description", e?.target?.value)}
            required={true}
          />

          <label htmlFor="price" className="font-semibold">
            Price:
          </label>
          <Input
            id="price"
            name={"price"}
            value={formProduct?.form?.price}
            placeHolder="Price"
            disabled={!isProductSelected}
            onChange={(e) => setProductField("price", e?.target?.value)}
            required={true}
          />

          <label htmlFor="stock" className="font-semibold">
            Stock:
          </label>
          <Input
            id="stock"
            name={"stock"}
            value={formProduct?.form?.stock}
            placeHolder="Stock"
            disabled={!isProductSelected}
            onChange={(e) => setProductField("stock", e?.target?.value)}
            required={true}
          />

          <Button
            type="submit"
            text="Modify product"
            disabled={!isProductSelected}
          />
        </form>

        <div className="hidden md:block w-full lg:w-1/2 min-w-0">
          <ProductCard product={formProduct?.form} display={false} />
        </div>
      </div>
    </div>
  )
}
