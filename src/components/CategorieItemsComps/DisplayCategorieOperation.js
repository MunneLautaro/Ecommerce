"use client"

import { useState, useReducer, useEffect } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import { useFetchItems } from "@/hooks/fetchItems"
import {
  initialItems,
  itemFilterReducer,
} from "../../reducers/categorieItemReducer"
import { toast } from "react-toastify"
import AddCategorieItem from "./CategorieOperationForms/AddCategorieItem"
import CategorieItemTableContainer from "./CategorieOperationForms/CategorieItemTableContainer"

export default function CategorieItems() {
  const [displayAddItem, setDisplayAddItem] = useState(true)
  const [itemFilter, dispatchItemFilter] = useReducer(
    itemFilterReducer,
    initialItems
  )
  const fetchItems = useFetchItems(dispatchItemFilter)

  useEffect(() => {
    if (!itemFilter?.response) return
    if (itemFilter?.response?.success) {
      toast.success(itemFilter?.response?.message)
    } else {
      toast.error(itemFilter?.response?.error)
    }
  }, [itemFilter?.response])

  useEffect(() => {
    dispatchItemFilter({ type: "FETCH_INIT" })

    fetchItems()
  }, [])

  return (
    <>
      <div className="flex flex-col items-center">
        <ItemContext.Provider value={itemFilter}>
          <ItemDispatchContext.Provider value={dispatchItemFilter}>
            <div className="flex">
              <div className="flex flex-col items-center justify-center m-5">
                <div className="flex">
                  <button
                    className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 py-2 px-[20px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
                    text="Add"
                    onClick={() =>
                      setDisplayAddItem((prevDisplay) => !prevDisplay)
                    }
                    disabled={displayAddItem}
                  >
                    Add
                  </button>
                  <button
                    className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 px-[10px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
                    onClick={() =>
                      setDisplayAddItem((prevDisplay) => !prevDisplay)
                    }
                    disabled={!displayAddItem}
                  >
                    Modify/Delete
                  </button>
                </div>
                {displayAddItem ? (
                  <AddCategorieItem onSubmit={fetchItems} />
                ) : (
                  <>
                    <CategorieItemTableContainer />
                  </>
                )}
              </div>
            </div>
          </ItemDispatchContext.Provider>
        </ItemContext.Provider>
      </div>
    </>
  )
}
