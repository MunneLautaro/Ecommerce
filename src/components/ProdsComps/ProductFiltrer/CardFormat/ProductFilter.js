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

export default function ProductFilter() {
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  useEffect(() => {
    dispatchProdFilter({ type: "FETCH_INIT" })

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FULL_URL}/api/prods`,
          {
            method: "GET",
          }
        )
        const products = await res.json()

        //Sacar en un helper
        const prices = products?.products?.map((product) => product?.price)
        const min = Math.min(...prices)
        const max = Math.max(...prices)

        dispatchProdFilter({
          type: "FETCH_SUCCESS",
          payload: products?.products,
        })

        dispatchProdFilter({
          type: "SET_RANGE_FILTER",
          payload: { attribute: "min", value: min },
        })
        dispatchProdFilter({
          type: "SET_RANGE_FILTER",
          payload: { attribute: "max", value: max },
        })
      } catch {
        dispatchProdFilter({
          type: "FETCH_FAIL",
          payload: "Error fetching products",
        })
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <ProductFilterContext.Provider value={prodFilter}>
          <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
            <div className="flex items-center justify-center absolute m-5 top-15">
              <FilterByKey keys={"brand"} />
              <FilterByKey keys={"model"} />
              <FilterByKey keys={"color"} />
              <FilterByKey keys={"product"} />
              <FilterByPrice
                min={prodFilter?.prodFilter?.range?.min || 0}
                max={prodFilter?.prodFilter?.range?.max || 100}
              />
            </div>
            <div className="mt-[50px]">
              <ShowProds />
            </div>
          </ProductFilterDispatchContext.Provider>
        </ProductFilterContext.Provider>
      </div>
    </>
  )
}
