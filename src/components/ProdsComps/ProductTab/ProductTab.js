"use client"

import { useState, useReducer } from "react"
import AddProduct from "../AddProduct/AddProduct"
import ModifyProduct from "../ModifyProduct/ModifyProduct"
import { ProductContext } from "../../../contexts/ProductContext"
import {
  initialFormState,
  productFormReducer,
} from "../../../reducers/productReducer"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import {
  initialItems,
  itemFilterReducer,
} from "../../../reducers/categorieItemReducer"

export default function ProductTab() {
  const [displayAddProduct, setDisplayAddProduct] = useState(true)
  const [itemsState, dispatchItems] = useReducer(
    itemFilterReducer,
    initialItems
  )

  const [formState, dispatchForm] = useReducer(
    productFormReducer,
    initialFormState
  )

  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center justify-center m-5">
          <div className="flex">
            <button
              className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 py-2 px-[20px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
              text="Add"
              onClick={() => {
                setDisplayAddProduct(true)
                dispatchForm({ type: "CLEAR_FORM" })
              }}
              disabled={displayAddProduct}
            >
              Add
            </button>
            <button
              className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 px-[10px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
              onClick={() => {
                setDisplayAddProduct(false)
                dispatchForm({ type: "CLEAR_FORM" })
              }}
              disabled={!displayAddProduct}
            >
              Modify
            </button>
          </div>
          <ItemContext.Provider value={itemsState}>
            <ItemDispatchContext.Provider value={dispatchItems}>
              <ProductContext.Provider value={[formState, dispatchForm]}>
                {displayAddProduct ? <AddProduct /> : <ModifyProduct />}
              </ProductContext.Provider>
            </ItemDispatchContext.Provider>
          </ItemContext.Provider>
        </div>
      </div>
    </>
  )
}
