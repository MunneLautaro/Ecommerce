"use client"

import { useCallback } from "react"
import { getProductsAction } from "@/actions/product"

export const useFetchProducts = (dispatch, dispatchProdFilter) => {
  const fetchProducts = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" })

    try {
      const products = await getProductsAction()

      if (!products?.products) {
        throw new Error("No data returned")
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: products.products,
      })
    } catch (error) {
      dispatch({
        type: "FETCH_FAIL",
        payload: error?.message || "Error fetching Products",
      })
    }
  }, [dispatch])

  const fetchProductsWithPriceRange = useCallback(async () => {
    dispatchProdFilter({ type: "FETCH_INIT" })

    try {
      const products = await getProductsAction()

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
  }, [dispatchProdFilter])

  return {
    fetchProducts,
    fetchProductsWithPriceRange,
  }
}
