"use client"

import FilterByKey from "./FilterByKey"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "@/contexts/ProductFilterContext"
import ShowProds from "../CardFormat/ShowProds"
import { useEffect, useContext } from "react"
import FilterByPrice from "./FilterByPrice"
import { useFetchProducts } from "../../../../hooks/useFetchProducts"

export default function ProductFilter({ isAdmin = false }) {
  const prodFilter = useContext(ProductFilterContext)
  const dispatchProdFilter = useContext(ProductFilterDispatchContext)

  const { fetchProductsWithPriceRange } = useFetchProducts(
    null,
    dispatchProdFilter
  )

  useEffect(() => {
    fetchProductsWithPriceRange()
  }, [fetchProductsWithPriceRange])

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex items-center justify-center absolute m-5 top-15">
        <FilterByKey keys="brand" />
        <FilterByKey keys="model" />
        <FilterByKey keys="color" />
        <FilterByKey keys="product" />
        <FilterByPrice
          min={prodFilter?.prodFilter?.range?.min || 0}
          max={prodFilter?.prodFilter?.range?.max || 100}
        />
      </div>

      <div className="mt-[50px]">
        <ShowProds isAdmin={isAdmin} onSubmit={fetchProductsWithPriceRange} />
      </div>
    </div>
  )
}
