"use client"
import { useContext } from "react"
import ProductCard from "../../../ProductCard/ProductCard"
import { ProductFilterContext } from "../../../../contexts/ProductFilterContext"
import { applyFilter } from "@/helpers"

export default function ShowProds() {
  const state = useContext(ProductFilterContext)

  return (
    <>
      {state?.loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap justify-center m-5">
          {state?.products && state?.products.length > 0 ? (
            applyFilter(state?.products, state?.prodFilter).map((prod) => (
              <ProductCard display={true} key={prod?.sku} product={prod} />
            ))
          ) : (
            <h1>There is no products</h1>
          )}
        </div>
      )}
    </>
  )
}
