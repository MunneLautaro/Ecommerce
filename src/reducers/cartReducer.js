export const initialCart = {
  cartProds: [],
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProd = state.cartProds.find(
        (Prod) => Prod.sku === action.payload.sku
      )

      if (existingProd) {
        return {
          ...state,
          cartProds: state.cartProds.map((Prod) =>
            Prod.sku === action.payload.sku
              ? { ...Prod, quantity: (Prod.quantity || 1) + 1 }
              : Prod
          ),
        }
      }

      return {
        ...state,
        cartProds: [...state.cartProds, { ...action.payload, quantity: 1 }],
      }
    }

    case "REMOVE_FROM_CART": {
      const existingProd = state.cartProds.find(
        (prod) => prod.sku === action.payload.sku
      )

      if (!existingProd) return state

      if ((existingProd.quantity || 1) > 1) {
        return {
          ...state,
          cartProds: state.cartProds.map((prod) =>
            prod.sku === action.payload.sku
              ? { ...prod, quantity: prod.quantity - 1 }
              : prod
          ),
        }
      }

      return {
        ...state,
        cartProds: state.cartProds.filter(
          (prod) => prod.sku !== action.payload.sku
        ),
      }
    }

    default:
      return state
  }
}
