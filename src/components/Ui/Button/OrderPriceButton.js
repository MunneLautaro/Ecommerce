"use client"

import Button from "../Button/Button"
import { useContext } from "react"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "../../../contexts/ProductFilterContext"

export default function OrderPriceButton() {
  const prodFilter = useContext(ProductFilterContext)
  const dispatchProdFilter = useContext(ProductFilterDispatchContext)

  const handleSort = () => {
    dispatchProdFilter({ type: "TOGGLE_SORT_ORDER" })
  }

  return (
    <Button
      textColor="amber-400"
      onClick={handleSort}
      text={<>{prodFilter?.prodFilter?.isAscending ? "DESC" : "ASC"}</>}
      m={0}
    />
  )
}
