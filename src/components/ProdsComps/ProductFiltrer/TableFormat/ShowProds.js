"use client"
import { useContext } from "react"
import { ProductFilterContext } from "../../../../contexts/ProductFilterContext"
import { applyFilter } from "@/helpers"
import ProductTable from "./ProductTable"

export default function ShowProds() {
  const state = useContext(ProductFilterContext)

  let products = applyFilter(state?.products, state?.prodFilter)

  return (
    <>
      {state?.loading ? (
        <h1>Loading...</h1>
      ) : (
        <ProductTable products={products} />
      )}
    </>
  )
}
