"use client"

import MyInput from "@/components/Ui/MyInput/MyInput"
import { useContext } from "react"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"

export default function FilterByColor() {
  const dispatchFilter = useContext(ProductFilterDispatchContext)

  const handleChange = (e) => {
    dispatchFilter({
      type: "filter",
      payload: { attrib: "color", value: e.target.value },
    })
  }

  return (
    <div className="m-2">
      <MyInput
        iType="text"
        iPlaceHolder="Search by color"
        iOnChange={handleChange}
      />
    </div>
  )
}
