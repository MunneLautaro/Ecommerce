"use client"

import MyInput from "@/components/Ui/MyInput/MyInput"
import { useContext } from "react"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"

export default function FilterByBrand() {
  const dispatchFilter = useContext(ProductFilterDispatchContext)

  const handleChange = (e) => {
    dispatchFilter({
      type: "filter",
      payload: { attrib: "brand", value: e.target.value },
    })
  }

  return (
    <div className="m-2">
      <MyInput
        type="text"
        placeHolder="Search by brand"
        onChange={handleChange}
      />
    </div>
  )
}
