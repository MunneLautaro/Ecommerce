"use server"
import ProductTab from "@/components/ProdsComps/ProductTab/ProductTab"

export default async function AddProds() {
  return (
    <div className="flex justify-center mb-5 items-start">
      <ProductTab />
    </div>
  )
}
