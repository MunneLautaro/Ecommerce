import { renderHook, act } from "@testing-library/react"
import { useReducer } from "react"
import {
  productFilterReducer,
  productIncialFilter,
} from "./productFilterReducer"

describe("productFilterReducer", () => {
  describe("SET_FILTER action", () => {
    it("should update brand filter correctly", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )

      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_FILTER",
          payload: {
            attribute: "brand",
            value: "Samsung",
          },
        })
      })

      const [state] = result.current
      expect(state.prodFilter.brand).toBe("Samsung")
      expect(state.prodFilter.product).toBe("")
    })

    it("should update product filter correctly", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )

      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_FILTER",
          payload: {
            attribute: "product",
            value: "Refrigerator",
          },
        })
      })

      const [state] = result.current
      expect(state.prodFilter.product).toBe("Refrigerator")
      expect(state.prodFilter.brand).toBe("")
    })
  })
  describe("SET_PRICE_FILTER action", () => {
    it("should update min price filter correctly", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_PRICE_FILTER",
          payload: {
            attribute: "min",
            value: 100,
          },
        })
      })

      const [state] = result.current
      expect(state.prodFilter.price.min).toBe(100)
      expect(state.prodFilter.price.max).toBeNull()
    })

    it("should update max price filter correctly", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_PRICE_FILTER",
          payload: {
            attribute: "max",
            value: 500,
          },
        })
      })

      const [state] = result.current
      expect(state.prodFilter.price.max).toBe(500)
      expect(state.prodFilter.price.min).toBeNull()
    })
  })
  describe("SET_RANGE_FILTER action", () => {
    it("should update min range filter correctlu", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_RANGE_FILTER",
          payload: {
            attribute: "min",
            value: 10,
          },
        })
      })

      const [state] = result.current
      expect(state.prodFilter.range.min).toBe(10)
      expect(state.prodFilter.range.max).toBeNull()
    })

    it("should update max range filter correctly", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_RANGE_FILTER",
          payload: {
            attribute: "max",
            value: 100,
          },
        })
      })

      const [state] = result.current
      expect(state.prodFilter.range.max).toBe(100)
      expect(state.prodFilter.range.min).toBeNull()
    })
  })

  describe("RESET_FILTERS action", () => {
    it("should reset all filters to initial state", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({
          type: "SET_FILTER",
          payload: {
            attribute: "brand",
            value: "LG",
          },
        })
        dispatch({
          type: "SET_PRICE_FILTER",
          payload: {
            attribute: "min",
            value: 200,
          },
        })
        dispatch({ type: "RESET_FILTERS" })
      })

      const [state] = result.current
      expect(state.prodFilter).toEqual(productIncialFilter.prodFilter)
    })
  })

  describe("TOGGLE_SORT_ORDER action", () => {
    it("should toggle isAscending boolean value", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({ type: "TOGGLE_SORT_ORDER" })
      })

      const [state] = result.current
      expect(state.prodFilter.isAscending).toBe(
        !productIncialFilter.prodFilter.isAscending
      )
    })
  })
  describe("FETCH actions", () => {
    it("should set loading to true on FETCH_INIT", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({ type: "FETCH_INIT" })
      })

      const [state] = result.current
      expect(state.loading).toBe(true)
      expect(state.error).toBeNull()
    })

    it("should set products and loading to false on FETCH_SUCCESS", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      const prods = [{ id: 1, name: "Product 1" }]
      act(() => {
        const [, dispatch] = result.current
        dispatch({ type: "FETCH_SUCCESS", payload: prods })
      })
      const [state] = result.current
      expect(state.products).toBe(prods)
      expect(state.loading).toBe(false)
      expect(state.error).toBeNull()
    })

    it("should set error and loading to false on FETCH_FAIL", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      const errorMsg = "Failed to fetch"
      act(() => {
        const [, dispatch] = result.current
        dispatch({ type: "FETCH_FAIL", payload: errorMsg })
      })
      const [state] = result.current
      expect(state.error).toBe(errorMsg)
      expect(state.loading).toBe(false)
    })
  })
  describe("Unknown action", () => {
    it("should return the current state for unknown action types", () => {
      const { result } = renderHook(() =>
        useReducer(productFilterReducer, productIncialFilter)
      )
      act(() => {
        const [, dispatch] = result.current
        dispatch({ type: "UNKNOWN_ACTION" })
      })

      const [state] = result.current
      expect(state).toEqual(productIncialFilter)
    })
  })
})

//npm test -- productFilterReducer --coverage
