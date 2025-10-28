"use server"
import Carrousel from "../components/Ui/Carrousel/Carrousel"
import ProductFilter from "@/components/ProdsComps/ProductFiltrer/CardFormat/ProductFilter"
//import ShowProds from "../../components/ProdsComps/ShowProds/ShowProds"
import MultiRangeSlider from "@/components/Ui/RangeSlider/MultiRangeSlider"

export default async function Productos() {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        {/*<ShowProds prods={prods} />*/}
        <ProductFilter />
        <Carrousel />
      </div>
    </>
  )
}
