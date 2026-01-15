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
})
