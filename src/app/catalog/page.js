"use server"
import ShowProds from "../../components/ProdsComps/ShowProds"
import { getProducts } from "@/controllers/index"

export default async function Productos() {
  const prods = await getProducts()
  return (
    <>
      <div className="flex items-center justify-center">
        <ShowProds prods={prods} />
      </div>
    </>
  )
}
