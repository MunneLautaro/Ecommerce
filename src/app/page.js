"use server"
import Carrousel from "../components/Ui/Carrousel/Carrousel"
import ProductFilter from "@/components/ProdsComps/ProductFiltrer/CardFormat/ProductFilter"
import MultiRangeSlider from "@/components/Ui/RangeSlider/MultiRangeSlider"

export default async function Productos() {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <ProductFilter />
        <Carrousel />
      </div>
    </>
  )
}
