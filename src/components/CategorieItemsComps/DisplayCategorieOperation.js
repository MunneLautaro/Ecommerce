"use client"

import { useState, useEffect, useContext } from "react"
import { useFetchItems } from "@/hooks/useFetchItems"
import { toast } from "react-toastify"
import AddCategorieItem from "./CategorieOperationForms/AddCategorieItem"
import CategorieItemTableContainer from "./CategorieOperationForms/CategorieItemTableContainer"
import { ItemDispatchContext, ItemContext } from "@/contexts/ItemContext"

export default function DisplayCategorieOperation({ items }) {
  const [displayAddItem, setDisplayAddItem] = useState(true)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const itemFilter = useContext(ItemContext)
  const { fetchItems } = useFetchItems(dispatchItemFilter)

  useEffect(() => {
    if (!itemFilter?.response) return
    if (itemFilter?.response?.success) {
      toast.success(`${itemFilter?.response?.success}`)
      toast.info(`${itemFilter?.response?.message}`)
    } else {
      toast.error(itemFilter?.response?.error)
    }
    dispatchItemFilter({ type: "CLEAR_RESPONSE" })
  }, [itemFilter?.response, dispatchItemFilter])

  useEffect(() => {
    fetchItems(items)
  }, [fetchItems, items])

  const TABS = [
    { label: "Add", component: <AddCategorieItem /> },
    { label: "Modify/Delete", component: <CategorieItemTableContainer /> },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full max-w-sm">
        {TABS.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setDisplayAddItem(index === 0)}
            className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
              (index === 0 ? displayAddItem : !displayAddItem)
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full mt-4 flex justify-center">
        {displayAddItem ? TABS[0].component : TABS[1].component}
      </div>
    </div>
  )
}
