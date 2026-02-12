"use client"

import { useCallback } from "react"

export const useFetchProducts = (dispatchProdFilter) => {
  const fetchProductsWithPriceRange = useCallback(
    async (products) => {
      dispatchProdFilter({ type: "FETCH_INIT" })

      try {
        if (!products?.products) {
          throw new Error("No data returned")
        }

        const prices = products.products.map((p) => p.price)
        const min = Math.min(...prices)
        const max = Math.max(...prices)

        dispatchProdFilter({
          type: "FETCH_SUCCESS",
          payload: products.products,
        })

        dispatchProdFilter({
          type: "SET_RANGE_FILTER",
          payload: { attribute: "min", value: min },
        })

        dispatchProdFilter({
          type: "SET_RANGE_FILTER",
          payload: { attribute: "max", value: max },
        })
      } catch (error) {
        dispatchProdFilter({
          type: "FETCH_FAIL",
          payload: error?.message || "Error fetching Products",
        })
      }
    },
    [dispatchProdFilter],
  )

  return {
    fetchProductsWithPriceRange,
  }
}
