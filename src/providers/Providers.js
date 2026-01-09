"use client"
import { useReducer } from "react"
import { cartReducer, initialCart } from "@/reducers/cartReducer"
import {
  ItemContext,
  ItemDispatchContext,
  CartContext,
  ProductFilterContext,
  ProductFilterDispatchContext,
  ProductContext,
} from "@/contexts"
import {
  initialItems,
  itemFilterReducer,
} from "@/reducers/categorieItemReducer"

import {
  productIncialFilter,
  productFilterReducer,
} from "@/reducers/productFilterReducer"

import { initialFormState, productFormReducer } from "@/reducers/productReducer"

export default function Providers({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart)
  const [itemFilter, dispatchItemFilter] = useReducer(
    itemFilterReducer,
    initialItems
  )
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter
  )

  const [formState, dispatchForm] = useReducer(
    productFormReducer,
    initialFormState
  )

  return (
    <ProductFilterContext.Provider value={prodFilter}>
      <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
        <ProductContext.Provider value={[formState, dispatchForm]}>
          <ItemContext.Provider value={itemFilter}>
            <ItemDispatchContext.Provider value={dispatchItemFilter}>
              <CartContext.Provider value={{ cart, dispatchCart }}>
                {children}
              </CartContext.Provider>
            </ItemDispatchContext.Provider>
          </ItemContext.Provider>
        </ProductContext.Provider>
      </ProductFilterDispatchContext.Provider>
    </ProductFilterContext.Provider>
  )
}
