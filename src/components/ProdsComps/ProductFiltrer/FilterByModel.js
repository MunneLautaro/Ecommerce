"use client"

import MyInput from "@/components/Ui/MyInput/MyInput"
import { useContext } from "react"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"

export default function FilterByModel() {
  const dispatchFilter = useContext(ProductFilterDispatchContext)

  const handleChange = (e) => {
    dispatchFilter({
      type: "filter",
      payload: { attrib: "model", value: e.target.value },
    })
  }

  return (
    <div className="m-2">
      <MyInput
        type="text"
        placeHolder="Search by model"
        onChange={handleChange}
      />
    </div>
  )
}
