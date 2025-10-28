"use client"

import { useContext } from "react"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"
import MultiRangeSlider from "@/components/Ui/RangeSlider/MultiRangeSlider"

export default function FilterByPrice({ min = 0, max = 100 }) {
  const dispatchFilter = useContext(ProductFilterDispatchContext)

  return (
    <div className="m-2">
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
    </div>
  )
}
