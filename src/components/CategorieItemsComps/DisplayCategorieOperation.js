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

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex">
          <div className="flex flex-col items-center justify-center m-5">
            <div className="flex">
              <button
                className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 py-2 px-[20px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
                text="Add"
                onClick={() => setDisplayAddItem((prevDisplay) => !prevDisplay)}
                disabled={displayAddItem}
              >
                Add
              </button>
              <button
                className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 px-[10px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
                onClick={() => setDisplayAddItem((prevDisplay) => !prevDisplay)}
                disabled={!displayAddItem}
              >
                Modify/Delete
              </button>
            </div>
            {displayAddItem ? (
              <AddCategorieItem />
            ) : (
              <>
                <CategorieItemTableContainer />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
