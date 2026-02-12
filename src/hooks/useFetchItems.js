"use client"

import { useCallback } from "react"

export const useFetchItems = (dispatch) => {
  const fetchItems = useCallback(
    (items) => {
      try {
        dispatch({ type: "FETCH_INIT" })

        if (!items) {
          throw new Error("No data returned")
        }

        dispatch({
          type: "FETCH_SUCCESS",
          payload: items,
        })
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: error?.message || "Error fetching items",
        })
      }
    },
    [dispatch],
  )

  const fetchItemsByType = useCallback(
    async (items) => {
      dispatch({ type: "FETCH_INIT" })

      try {
        if (!items?.data) {
          throw new Error("No data returned")
        }

        const normalize = (items = []) =>
          Array.from(
            new Map(
              items.map((item) => [
                item.prodId,
                { label: item.value, value: item.prodId },
              ]),
            ).values(),
          )

        dispatch({
          type: "SET_ALL_COLLECTIONS",
          payload: {
            brands: normalize(items?.data?.brands),
            models: normalize(items?.data?.models),
            colors: normalize(items?.data?.colors),
            productnames: normalize(items?.data?.productnames),
          },
        })
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: error?.message || "Error fetching items",
        })
      }
    },
    [dispatch],
  )

  return {
    fetchItems,
    fetchItemsByType,
  }
}
