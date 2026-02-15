export const initialCart = {
  cartProds: [],
  response: null,
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProd = state.cartProds.find(
        (Prod) => Prod.sku === action.payload.sku,
      )

      if (existingProd) {
        return {
          ...state,
          cartProds: state.cartProds.map((Prod) =>
            Prod.sku === action.payload.sku
              ? { ...Prod, quantity: (Prod.quantity || 1) + 1 }
              : Prod,
          ),
        }
      }

      return {
        ...state,
        cartProds: [...state.cartProds, { ...action.payload, quantity: 1 }],
      }
    }

    case "REMOVE_UNIT_FROM_CART": {
      const existingProd = state.cartProds.find(
        (prod) => prod.sku === action.payload.sku,
      )

      if (!existingProd) return state

      if ((existingProd.quantity || 1) > 1) {
        return {
          ...state,
          cartProds: state.cartProds.map((prod) =>
            prod.sku === action.payload.sku
              ? { ...prod, quantity: prod.quantity - 1 }
              : prod,
          ),
        }
      }

      return {
        ...state,
        cartProds: state.cartProds.filter(
          (prod) => prod.sku !== action.payload.sku,
        ),
      }
    }

    case "DELETE_PRODUCT": {
      return {
        ...state,
        cartProds: state.cartProds.filter(
          (prod) => prod.sku !== action.payload.sku,
        ),
      }
    }

    case "SET_RESPONSE": {
      return {
        ...state,
        response: action.payload,
      }
    }

    case "CLEAR_RESPONSE": {
      return {
        ...state,
        response: null,
      }
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cartProds: [],
      }
    }
    default:
      return state
  }
}
