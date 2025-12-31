"use client"

import { useContext } from "react"
import {
  ProductFilterDispatchContext,
  ProductFilterContext,
} from "@/contexts/ProductFilterContext"
import MultiRangeSlider from "@/components/Ui/RangeSlider/MultiRangeSlider"

export default function FilterByPrice({ min = 0, max = 100 }) {
  const dispatchFilter = useContext(ProductFilterDispatchContext)
  const prodFilter = useContext(ProductFilterContext)

  return (
    <div className="m-2">
      {prodFilter.products && prodFilter.products.length > 1 ? (
        <MultiRangeSlider
          min={min}
          max={max}
          onChange={({ min, max }) => {
            dispatchFilter({
              type: "SET_PRICE_FILTER",
              payload: { attribute: "min", value: min },
            })
            dispatchFilter({
              type: "SET_PRICE_FILTER",
              payload: { attribute: "max", value: max },
            })
          }}
        />
      ) : (
        ""
      )}
    </div>
  )
}
