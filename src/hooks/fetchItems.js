"use client"

import { useCallback } from "react"
import {
  getCategorieItemsAction,
  getItemsByTypeAction,
} from "@/actions/categorieAction"

const typeToActionMap = {
  brand: "SET_BRANDS",
  productname: "SET_PRODUCTS",
  color: "SET_COLORS",
  model: "SET_MODELS",
}

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

  const fetchItemsByType = useCallback(
    async (type) => {
      const actionType = typeToActionMap[type]

      if (!actionType) {
        console.warn(`Invalid type: ${type}`)
        return
      }

      dispatch({ type: "FETCH_INIT" })

      try {
        const items = await getItemsByTypeAction(type)

        if (!items?.data) {
          throw new Error("No data returned")
        }

        const normalized = Array.from(
          new Map(
            items.data.map((item) => [
              item.prodId,
              {
                label: item.value,
                value: item.prodId,
              },
            ])
          ).values()
        )

        dispatch({
          type: actionType,
          payload: normalized,
        })
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: error?.message || "Error fetching items",
        })
      }
    },
    [dispatch]
  )

  return {
    fetchItems,
    fetchItemsByType,
  }
}
