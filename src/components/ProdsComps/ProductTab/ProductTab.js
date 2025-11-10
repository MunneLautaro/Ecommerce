"use client"

import { useState } from "react"
import AddProduct from "../AddProduct/AddProduct"
import ModifyProduct from "../ModifyProduct/ModifyProduct"
import { useSearchParams } from "next/navigation"

export default function ProductTab() {
  const [displayAddProduct, setDisplayAddProduct] = useState(true)
  const searchParams = useSearchParams()

  console.log({ searchParams })

  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center justify-center m-5">
          <div className="flex">
            <button
              className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 py-2 px-[20px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
              text="Add"
              onClick={() => setDisplayAddProduct(true)}
              disabled={displayAddProduct}
            >
              Add
            </button>
            <button
              className="transition:ease-in-out duration-200 bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 px-[10px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300"
              onClick={() => setDisplayAddProduct(false)}
              disabled={!displayAddProduct}
            >
              Modify
            </button>
          </div>
          {displayAddProduct ? <AddProduct /> : <ModifyProduct />}
        </div>
      </div>
    </>
  )
}
