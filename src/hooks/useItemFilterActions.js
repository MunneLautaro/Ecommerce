import { useCallback } from "react"

export function useItemFilterActions(dispatchItemFilter) {
  const changeAscending = useCallback(() => {
    dispatchItemFilter({
      type: "TOGGLE_ASCENDING",
    })
  }, [dispatchItemFilter])

  const setFilter = useCallback(
    (attribute, value) => {
      dispatchItemFilter({
        type: "SET_FILTER",
        payload: { attribute, value },
      })
    },
    [dispatchItemFilter]
  )

  const setItem = useCallback(
    (item) => {
      dispatchItemFilter({
        type: "SET_ITEM",
        payload: item,
      })
    },
    [dispatchItemFilter]
  )

  const handleDateChange = useCallback(
    (date) =>
      dispatchItemFilter({
        type: "SET_FILTER_DATE",
        payload: date,
      }),
    [dispatchItemFilter]
  )

  const resetCurrentItem = useCallback(() => {
    dispatchItemFilter({ type: "RESET_CURRENT_ITEM" })
  }, [dispatchItemFilter])

  const setResponse = useCallback(
    (response) => {
      dispatchItemFilter({ type: "SET_RESPONSE", payload: response })
    },
    [dispatchItemFilter]
  )

  const clearNewValue = useCallback(() => {
    dispatchItemFilter({ type: "CLEAR_NEW_VALUE" })
  }, [dispatchItemFilter])

  return {
    changeAscending,
    setFilter,
    setItem,
    handleDateChange,
    resetCurrentItem,
    setResponse,
    clearNewValue,
  }
}
