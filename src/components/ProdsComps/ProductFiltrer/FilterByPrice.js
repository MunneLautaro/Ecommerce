"use client"

import RangeSlider from "@/components/RangeSlider/RangeSlider"
import { useContext, useEffect, useState } from "react"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"

export default function FilterByPrice({ min = 0, max = 100 }) {
  const dispatchFilter = useContext(ProductFilterDispatchContext)
  const [value, setValue] = useState(Number(max))

  useEffect(() => {
    const minNum = Number(min)
    const maxNum = Number(max)
    setValue(maxNum)

    dispatchFilter({
      type: "setRange",
      payload: { attrib: "minRange", value: minNum },
    })
    dispatchFilter({
      type: "setRange",
      payload: { attrib: "maxRange", value: maxNum },
    })

    dispatchFilter({
      type: "filterPrice",
      payload: { attrib: "minPrice", value: minNum },
    })
    dispatchFilter({
      type: "filterPrice",
      payload: { attrib: "maxPrice", value: maxNum },
    })
  }, [min, max, dispatchFilter])

  const handleChange = (e) => {
    const newValue = Number(e.target.value)
    setValue(newValue)

    dispatchFilter({
      type: "setRange",
      payload: { attrib: "maxRange", value: newValue },
    })
    dispatchFilter({
      type: "filterPrice",
      payload: { attrib: "maxPrice", value: newValue },
    })
  }

  return (
    <div className="m-2">
      <RangeSlider min={min} max={max} value={value} onChange={handleChange} />
      <p className="text-sm mt-1">Hasta ${value}</p>
    </div>
  )
}
