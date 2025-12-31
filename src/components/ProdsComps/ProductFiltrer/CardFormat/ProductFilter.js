"use client"

import FilterByKey from "./FilterByKey"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "@/contexts/ProductFilterContext"
import {
  productIncialFilter,
  productFilterReducer,
} from "@/reducers/productFilterReducer"
import ShowProds from "./ShowProds"
import { useEffect, useReducer } from "react"
import FilterByPrice from "./FilterByPrice"
import { useFetchProducts } from "../../../../hooks/fetchProducts"

export default function ProductFilter({ isAdmin = false }) {
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  const { fetchProductsWithPriceRange } = useFetchProducts(
    null,
    dispatchProdFilter
  )

  useEffect(() => {
    fetchProductsWithPriceRange()
  }, [fetchProductsWithPriceRange])

  return (
    <div className="flex flex-wrap justify-center">
      <ProductFilterContext.Provider value={prodFilter}>
        <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
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
            <ShowProds
              isAdmin={isAdmin}
              onSubmit={fetchProductsWithPriceRange}
            />
          </div>
        </ProductFilterDispatchContext.Provider>
      </ProductFilterContext.Provider>
    </div>
  )
}
