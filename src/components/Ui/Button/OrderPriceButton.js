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
    <button
      className={`relative transition:ease-in-out duration-200 bg-violet-800 rounded-md text-amber-400 hover:bg-violet-900 active:bg-violet-950 p-[5px] mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300 min-w-[60px] justify-center flex`}
      onClick={handleSort}
    >
      {prodFilter?.prodFilter?.isAscending ? "DESC" : "ASC"}
    </button>
  )
}
