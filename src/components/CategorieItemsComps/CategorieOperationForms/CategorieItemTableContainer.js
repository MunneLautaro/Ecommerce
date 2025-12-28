"use client"

import { useContext, useState } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import { RefreshCcw } from "react-feather"
import MyButton from "@/components/Ui/MyButton/MyButton"
import ItemTable from "./ItemTable"
import ItemActionButton from "../ItemActionButton"
import { Trash2, Edit } from "react-feather"
import {
  modifyCategorieAction,
  deleteCategorieItemAction,
} from "@/actions/categorieAction"
import { useFetchItems } from "@/hooks/fetchItems"

export default function CategorieItemTableContainer() {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const fetchItems = useFetchItems(dispatchItemFilter)
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

  console.log({ itemFilter })
  return (
    <>
      <div className="flex flex-row items-start justify-end mb-4">
        <MyButton
          onClick={resetFilters}
          disabled={isRefreshDisabled}
          text={<RefreshCcw />}
        />
      </div>
      <ItemTable resetTrigger={resetTrigger} />
      <ItemActionButton
        disabled={!itemFilter?.newValue}
        onClick={async (e) => {
          const modItemResponse = await modifyCategorieAction(
            itemFilter?.currentItem?.type,
            itemFilter?.currentItem?.value,
            itemFilter?.newValue
          )
          dispatchItemFilter({ type: "SET_RESPONSE", payload: modItemResponse })
          fetchItems()
          dispatchItemFilter({ type: "RESET_CURRENT_ITEM" })
        }}
      >
        <Edit />
      </ItemActionButton>
      <ItemActionButton
        disabled={!itemFilter?.currentItem}
        onClick={async (e) => {
          e.preventDefault()
          const delItemResponse = await deleteCategorieItemAction(
            itemFilter?.currentItem?.type,
            itemFilter?.currentItem?.value
          )
          dispatchItemFilter({ type: "SET_RESPONSE", payload: delItemResponse })
          fetchItems()
          dispatchItemFilter({ type: "RESET_CURRENT_ITEM" })
        }}
      >
        <Trash2 />
      </ItemActionButton>
    </>
  )
}
