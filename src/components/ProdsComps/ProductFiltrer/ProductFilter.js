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
import { aplyFilter } from "@/helpers/aplyFilter"
import ShowProds from "../ShowProds/ShowProds"
import { useEffect, useReducer, useState } from "react"

export default function ProductFilter({ products }) {
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  console.log({ products })
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    setFilteredProducts(aplyFilter(products, prodFilter))
  }, [prodFilter, products])

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <ProductFilterContext.Provider value={prodFilter}>
          <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
            <div className="flex">
              <FilterByName />
              <FilterByBrand />
              <FilterByModel />
              <FilterByColor />
              <FilterByPrice />
            </div>
          </ProductFilterDispatchContext.Provider>
        </ProductFilterContext.Provider>

        <ShowProds prods={filteredProducts} />
      </div>
    </>
  )
}
