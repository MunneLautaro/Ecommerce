"use client"
import { useContext, useReducer } from "react"
import { ProductFilterContext } from "../../../../contexts/ProductFilterContext"
import { applyFilter } from "@/helpers"
import ProductButton from "./ProductButton"

export default function ShowProds() {
  const state = useContext(ProductFilterContext)

  return (
    <>
      {state?.loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col flex-wrap justify-center">
          {state?.products && state?.products.length > 0 ? (
            applyFilter(state?.products, state?.prodFilter).map(
              (prod, index) => (
                <div className="h-[70px] w-[400px]" key={prod?.sku}>
                  <ProductButton key={prod?.sku} prod={prod} index={index} />
                </div>
              )
            )
          ) : (
            <h1>There is no products</h1>
          )}
        </div>
      )}
    </>
  )
}
