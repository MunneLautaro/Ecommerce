"use client"

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
import { RefreshCcw } from "react-feather"

export default function ModifyProduct() {
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  const [formState, dispatchForm] = useReducer(
    productFormReducer,
    initialFormState
  )

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/api/prods`, {
        method: "GET",
      })
      const products = await res.json()

      //Sacar en un helper
      const prices = products?.products?.map((product) => product?.price)
      const min = Math.min(...prices)
      const max = Math.max(...prices)

      dispatchProdFilter({
        type: "FETCH_SUCCESS",
        payload: products?.products,
      })

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

  useEffect(() => {
    dispatchProdFilter({ type: "FETCH_INIT" })

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
              <div className="flex flex-col items-start justify-start gap-4">
                <div className="flex flex-col-reverse items-end">
                  <ShowProds />
                  <MyButton
                    text={<RefreshCcw />}
                    onClick={() =>
                      dispatchProdFilter({ type: "RESET_FILTERS" })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-flow-col justify-center gap-4">
                <ModifyProductForm onSubmit={fetchProducts} />
              </div>
            </ProductContext.Provider>
          </ProductFilterDispatchContext.Provider>
        </ProductFilterContext.Provider>
      </div>
    </>
  )
}
