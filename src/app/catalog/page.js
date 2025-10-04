"use server"
import Carrousel from "@/components/Carrousel/Carrousel"
import ProductFilter from "@/components/ProdsComps/ProductFiltrer/ProductFilter"
//import ShowProds from "../../components/ProdsComps/ShowProds/ShowProds"
import { getProducts } from "@/controllers/index"

export default async function Productos() {
  const prods = await getProducts()

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        {/*<ShowProds prods={prods} />*/}
        <ProductFilter products={prods?.products} />
        <Carrousel products={prods?.products} />
      </div>
    </>
  )
}
