"use client"
import {
  ItemContext,
  ItemDispatchContext,
  CartContext,
  ProductFilterContext,
  ProductFilterDispatchContext,
  ProductContext,
  SessionContext,
  CheckOutContext,
} from "@/contexts"
import { useReducer, useEffect } from "react"
import { toast } from "react-toastify"
import { initialCart, cartReducer } from "@/reducers/cartReducer"
import {
  initialItems,
  itemFilterReducer,
} from "@/reducers/categorieItemReducer"
import {
  productIncialFilter,
  productFilterReducer,
} from "@/reducers/productFilter/productFilterReducer"
import { initialFormState, productFormReducer } from "@/reducers/productReducer"
import { initialSession, sessionReducer } from "@/reducers/sessionReducer"
import { initialCheckOut, checkOutReducer } from "@/reducers/checkOutReducer"

export default function Providers({ children, initialSessionData }) {
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart, (init) => {
    if (typeof window === "undefined") return init
    const stored = localStorage.getItem("cart")
    return stored ? { cartProds: JSON.parse(stored), response: null } : init
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.cartProds))
  }, [cart.cartProds])

  useEffect(() => {
    if (!cart.response) return
    if (cart.response?.success) {
      toast.success(cart.response.success)
    } else {
      toast.error(cart.response?.error)
    }
    dispatchCart({ type: "CLEAR_RESPONSE" })
  }, [cart.response, dispatchCart])

  const [itemFilter, dispatchItemFilter] = useReducer(
    itemFilterReducer,
    initialItems,
  )
  const [prodFilter, dispatchProdFilter] = useReducer(
    productFilterReducer,
    productIncialFilter,
  )

  const [formState, dispatchForm] = useReducer(
    productFormReducer,
    initialFormState,
  )

  const [session, dispatchSession] = useReducer(
    sessionReducer,
    initialSessionData || initialSession,
  )
  const [checkOutState, dispatchCheckOut] = useReducer(
    checkOutReducer,
    initialCheckOut,
  )

  useEffect(() => {
    dispatchSession({
      type: initialSessionData?.session ? "SET_SESSION" : "CLEAR_SESSION",
    })
    dispatchSession({
      type: "SET_USER",
      payload: initialSessionData?.user || null,
    })
  }, [initialSessionData])
  return (
    <SessionContext.Provider value={[session, dispatchSession]}>
      <ProductFilterContext.Provider value={prodFilter}>
        <ProductFilterDispatchContext.Provider value={dispatchProdFilter}>
          <ProductContext.Provider value={[formState, dispatchForm]}>
            <CheckOutContext.Provider value={[checkOutState, dispatchCheckOut]}>
              <ItemContext.Provider value={itemFilter}>
                <ItemDispatchContext.Provider value={dispatchItemFilter}>
                  <CartContext.Provider value={{ cart, dispatchCart }}>
                    {children}
                  </CartContext.Provider>
                </ItemDispatchContext.Provider>
              </ItemContext.Provider>
            </CheckOutContext.Provider>
          </ProductContext.Provider>
        </ProductFilterDispatchContext.Provider>
      </ProductFilterContext.Provider>
    </SessionContext.Provider>
  )
}
