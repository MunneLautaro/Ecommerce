"use client"

import Input from "@/components/Ui/Input/Input"
import { useContext } from "react"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"

export default function FilterByKey({ keys }) {
  const dispatchFilter = useContext(ProductFilterDispatchContext)

  const handleChange = (e) => {
    dispatchFilter({
      type: "SET_FILTER",
      payload: { attribute: keys, value: e.target.value },
    })
  }

  return (
    <div className="m-2">
      <label
        htmlFor={`filter-${keys}`}
        className="text-sm font-medium text-gray-200 block mb-1"
      >
        Search by {keys}
      </label>
      <Input
        id={`filter-${keys}`}
        type="text"
        placeHolder={`Search by ${keys}`}
        onChange={handleChange}
      />
    </div>
  )
}
