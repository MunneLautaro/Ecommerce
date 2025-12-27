"use client"

import { useState, useReducer, useEffect } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import {
  deleteCategorieItemAction,
  getCategorieItemsAction,
} from "@/actions/categorieAction"
import { Trash2, Edit } from "react-feather"
import {
  initialItems,
  itemFilterReducer,
} from "../../reducers/categorieItemReducer"
import { modifyCategorieAction } from "@/actions/categorieAction"
import { toast } from "react-toastify"
import AddCategorieItem from "./CategorieOperationForms/AddCategorieItem"
import ModDelCategorieItemTable from "./CategorieOperationForms/ModDelCategorieItemTable"
import ItemActionButton from "./ItemActionButton"

export default function CategorieItems() {
  const [displayAddItem, setDisplayAddItem] = useState(true)
  const [response, setResponse] = useState(null)
  const [itemFilter, dispatchItemFilter] = useReducer(
    itemFilterReducer,
    initialItems
  )

  useEffect(() => {
    if (!response) return
    if (response?.success) {
      toast.success(response?.success)
      toast.info(response?.message)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  const fetchItems = async () => {
    try {
      const items = await getCategorieItemsAction()

      dispatchItemFilter({
        type: "FETCH_SUCCESS",
        payload: items?.data,
      })
    } catch {
      dispatchItemFilter({
        type: "FETCH_FAIL",
        payload: "Error fetching products",
      })
    }
  }

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
                    <div className="flex flex-row items-start">
                      <ModDelCategorieItemTable />
                      <ItemActionButton
                        disabled={!itemFilter?.newValue}
                        onClick={async (e) => {
                          const modItemResponse = await modifyCategorieAction(
                            itemFilter?.currentItem?.type,
                            itemFilter?.currentItem?.value,
                            itemFilter?.newValue
                          )
                          setResponse(modItemResponse)
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
                          const delItemResponse =
                            await deleteCategorieItemAction(
                              itemFilter?.currentItem?.type,
                              itemFilter?.currentItem?.value
                            )
                          setResponse(delItemResponse)
                          fetchItems()
                          dispatchItemFilter({ type: "RESET_CURRENT_ITEM" })
                        }}
                      >
                        <Trash2 />
                      </ItemActionButton>
                    </div>
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
