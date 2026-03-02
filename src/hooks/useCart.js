import { useCallback } from "react"

export function useCart(cart, dispatchCart) {
  const addToCart = useCallback(
    (product) => {
      dispatchCart({
        type: "ADD_TO_CART",
        payload: product,
      })
      dispatchCart({
        type: "SET_RESPONSE",
        payload: {
          success: `Item added to cart: ${product?.product}`,
        },
      })
    },
    [dispatchCart],
  )

  const removeUnitFromCart = useCallback(
    (product) => {
      if (!product) return
      if (
        !cart?.cartProds?.find((item) => item.sku === product.sku)?.quantity
      ) {
        dispatchCart({
          type: "SET_RESPONSE",
          payload: {
            success: `The item: ${product?.product} is not in the cart`,
          },
        })
        return
      }
      dispatchCart({
        type: "REMOVE_UNIT_FROM_CART",
        payload: product,
      })
      dispatchCart({
        type: "SET_RESPONSE",
        payload: {
          success: `Item removed from cart: ${product?.product}`,
        },
      })
    },
    [dispatchCart],
  )

  const deleteProductFromCart = useCallback(
    (product) => {
      dispatchCart({
        type: "DELETE_PRODUCT",
        payload: product,
      })
      dispatchCart({
        type: "SET_RESPONSE",
        payload: {
          success: `Item deleted from cart: ${product?.product}`,
        },
      })
    },
    [dispatchCart],
  )

  return {
    addToCart,
    removeUnitFromCart,
    deleteProductFromCart,
  }
}
