"use client"

import MyInput from "@/components/Ui/MyInput/MyInput"
import { useContext } from "react"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "../../../contexts/ProductFilterContext"

export default function FilterByName() {
  const dispatchFilter = useContext(ProductFilterDispatchContext)
  const filter = useContext(ProductFilterContext)

  const handleChange = (e) => {
    dispatchFilter({
      type: "filter",
      payload: { attrib: "product", value: e.target.value },
    })
    console.log({ filter })
  }

  return (
    <div className="m-2">
      <MyInput
        type="text"
        placeHolder="Search by name"
        onChange={handleChange}
      />
    </div>
  )
}
