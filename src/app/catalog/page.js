"use server"
import ProductFilter from "@/components/ProdsComps/ProductFiltrer/ProductFilter"
//import ShowProds from "../../components/ProdsComps/ShowProds/ShowProds"
import { getProducts } from "@/controllers/index"

export default async function Productos() {
  const prods = await getProducts()

  return (
    <>
      <div className="flex items-center justify-center">
        {/*<ShowProds prods={prods} />*/}
        <ProductFilter products={prods?.products} />
      </div>
    </>
  )
}
