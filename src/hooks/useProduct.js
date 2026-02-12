"use client"

import { useCallback } from "react"

export const useProduct = (dispatch) => {
  const setProductField = useCallback(
    (attribute, value) => {
      dispatch({
        type: "SET_PRODUCT",
        payload: { [attribute]: value },
      })
    },
    [dispatch],
  )

  const setResponse = useCallback(
    (response) => {
      dispatch({ type: "SET_RESPONSE", payload: response })
    },
    [dispatch],
  )
  return { setProductField, setResponse }
}
