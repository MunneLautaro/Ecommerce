"use client"

import { useCallback } from "react"
import { getCategorieItemsAction } from "@/actions/categorieAction"

export const useFetchItems = (dispatch) => {
  const fetchItems = useCallback(async () => {
    dispatch({
      type: "FETCH_INIT",
    })

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

  return fetchItems
}
