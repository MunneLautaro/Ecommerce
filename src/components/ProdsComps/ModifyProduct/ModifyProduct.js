"use client"

import DropDown from "@/components/Ui/DropDown/DropDown"
import ModifyProductForm from "./ModifyProductForm"
import MyButton from "@/components/Ui/MyButton/MyButton"
import {
  productIncialFilter,
  productFilterReducer,
} from "@/reducers/productFilterReducer"
import {
  initialFormState,
  productFormReducer,
} from "../../../reducers/productReducer"
import { useEffect, useReducer } from "react"
import ShowProds from "../ProductFiltrer/TableFormat/ShowProds"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "@/contexts/ProductFilterContext"
import { ProductContext } from "@/contexts/ProductContext"

export default function ModifyProduct() {
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  const [formState, dispatchForm] = useReducer(
    productFormReducer,
    initialFormState
  )

  useEffect(() => {
    dispatchProdFilter({ type: "FETCH_INIT" })

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FULL_URL}/api/prods`,
          {
            method: "GET",
          }
        )
        const products = await res.json()

        //Sacar en un helper
        const prices = products?.products?.map((product) => product?.price)
        const min = Math.min(...prices)
        const max = Math.max(...prices)

        dispatchProdFilter({
          type: "FETCH_SUCCESS",
          payload: products?.products,
        })

        console.log({ products })
        dispatchProdFilter({
          type: "SET_RANGE_FILTER",
          payload: { attribute: "min", value: min },
        })
        dispatchProdFilter({
          type: "SET_RANGE_FILTER",
          payload: { attribute: "max", value: max },
        })
      } catch {
        dispatchProdFilter({
          type: "FETCH_FAIL",
          payload: "Error fetching products",
        })
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1 className="flex text-lg font-semibold mb-4">
        Modify an existent product!
      </h1>
      <div className="grid grid-cols-2 gap-4" data-testid="ModProductComponent">
        <ProductFilterContext.Provider value={prodFilter}>
          <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
            <ProductContext.Provider value={[formState, dispatchForm]}>
              <div className="flex flex-col items-center justify-center gap-4 ">
                <div className="grid grid-flow-col">
                  <DropDown elements={[1, 2, 3]} />
                  <DropDown elements={[1, 2, 3]} />
                  <DropDown elements={[1, 2, 3]} />
                  <DropDown elements={[1, 2, 3]} />
                  <MyButton text="Order by price" />
                </div>

                <ShowProds />
              </div>

              <div className="grid grid-flow-col justify-center gap-4  ">
                <ModifyProductForm />
              </div>
            </ProductContext.Provider>
          </ProductFilterDispatchContext.Provider>
        </ProductFilterContext.Provider>
      </div>
    </>
  )
}
