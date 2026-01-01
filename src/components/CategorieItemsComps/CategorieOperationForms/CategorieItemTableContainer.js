"use client"

import { useContext, useState } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import { RefreshCcw } from "react-feather"
import Button from "@/components/Ui/Button/Button"
import ItemTable from "../ItemTable/ItemTable"

export default function CategorieItemTableContainer() {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const [resetTrigger, setResetTrigger] = useState(false)
  const resetFilters = () => {
    dispatchItemFilter({ type: "RESET_FILTERS" })
    setResetTrigger((prev) => !prev)
  }

  const isRefreshDisabled =
    itemFilter?.itemFilter?.isAscending &&
    itemFilter?.itemFilter?.fieldToSort === "type" &&
    !itemFilter?.itemFilter?.date.startDate &&
    !itemFilter?.itemFilter?.date.endDate &&
    itemFilter?.itemFilter?.type === ""
  return (
    <>
      <div className="flex flex-row items-start justify-between mb-4">
        <Button
          onClick={resetFilters}
          disabled={isRefreshDisabled}
          text={<RefreshCcw />}
        />
      </div>
      <ItemTable resetTrigger={resetTrigger} />
    </>
  )
}
