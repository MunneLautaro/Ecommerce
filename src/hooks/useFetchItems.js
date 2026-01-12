"use client"

import { useCallback } from "react"
import {
  getCategorieItemsAction,
  getItemsByTypeAction,
} from "@/actions/categorieAction"

export const useFetchItems = (dispatch) => {
  const fetchItems = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" })

    try {
      const items = await getCategorieItemsAction()

      if (!items?.data) {
        throw new Error("No data returned")
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: items.data,
      })
    } catch (error) {
      dispatch({
        type: "FETCH_FAIL",
        payload: error?.message || "Error fetching items",
      })
    }
  }, [dispatch])

  const fetchItemsByType = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" })

    try {
      const response = await getItemsByTypeAction()
      console.log({ response })

      if (!response?.data) {
        throw new Error("No data returned")
      }

      const normalize = (items = []) =>
        Array.from(
          new Map(
            items.map((item) => [
              item.prodId,
              { label: item.value, value: item.prodId },
            ])
          ).values()
        )

      dispatch({
        type: "SET_ALL_COLLECTIONS",
        payload: {
          brands: normalize(response?.data?.brands),
          models: normalize(response?.data?.models),
          colors: normalize(response?.data?.colors),
          productnames: normalize(response?.data?.productnames),
        },
      })
    } catch (error) {
      dispatch({
        type: "FETCH_FAIL",
        payload: error?.message || "Error fetching items",
      })
    }
  }, [dispatch])

  return {
    fetchItems,
    fetchItemsByType,
  }
}
