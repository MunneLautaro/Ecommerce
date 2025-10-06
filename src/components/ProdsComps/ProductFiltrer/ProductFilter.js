"use client"

import FilterByBrand from "./FilterByBrand"
import FilterByColor from "./FilterByColor"
import FilterByModel from "./FilterByModel"
import FilterByName from "./FilterByName"
import FilterByPrice from "./FilterByPrice"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "@/contexts/ProductFilterContext"
import {
  productIncialFilter,
  productFilterReducer,
} from "@/reducers/productFilterReducer"
import { calculateMaximum, calculateMinimum, aplyFilter } from "@/helpers/index"
import ShowProds from "../ShowProds/ShowProds"
import { useEffect, useReducer, useState } from "react"

export default function ProductFilter({ products }) {
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  const [filteredProducts, setFilteredProducts] = useState(products)

  const min = calculateMinimum(products)
  const max = calculateMaximum(products)

  useEffect(() => {
    setFilteredProducts(aplyFilter(products, prodFilter))
  }, [prodFilter, products])

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <ProductFilterContext.Provider value={prodFilter}>
          <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
            <div className="flex items-center justify-center absolute m-5 top-15">
              <FilterByName />
              <FilterByBrand />
              <FilterByModel />
              <FilterByColor />
              <FilterByPrice min={min} max={max} />
            </div>
          </ProductFilterDispatchContext.Provider>
        </ProductFilterContext.Provider>
        <div className="mt-[50px]">
          <ShowProds prods={filteredProducts} />
        </div>
      </div>
    </>
  )
}
