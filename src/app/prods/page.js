"use server"
import ProductTab from "@/components/ProdsComps/ProductTab/ProductTab"
import { getProductsAction } from "@/actions/product"
import { getItemsByTypeAction } from "@/actions/categorieAction"

export default async function Prods() {
  const products = await getProductsAction({ next: { tags: ["products"] } })
  const items = await getItemsByTypeAction({ next: { tags: ["items"] } })

  return (
    <div className="flex justify-center mb-5 items-start">
      <ProductTab products={products} items={items} />
    </div>
  )
}
