"use client"

import { useContext, useState } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import { RefreshCcw } from "react-feather"
import Button from "@/components/Ui/Button/Button"
import ItemTable from "../ItemTable/ItemTable"
import { useItemFilterActions } from "@/hooks/useItemFilterActions"
import Caption from "@/components/Ui/Caption/Caption"

export default function CategorieItemTableContainer() {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const [resetTrigger, setResetTrigger] = useState(false)
  const { resetFilters } = useItemFilterActions(dispatchItemFilter)
  const reset = () => {
    resetFilters()
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
      <div className="flex flex-col items-start justify-between mb-4">
        <Caption customStyle={"text-xl font-bold text-center my-4 w-full"}>
          Modify/Delete Categorie Item
        </Caption>
        <ItemTable
          resetTrigger={resetTrigger}
          refreshButton={
            <Button
              onClick={reset}
              disabled={isRefreshDisabled}
              text={<RefreshCcw />}
            />
          }
        />
      </div>
    </>
  )
}
