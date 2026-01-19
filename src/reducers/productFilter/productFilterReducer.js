export const productIncialFilter = {
  products: null,
  loading: true,
  error: null,
  prodFilter: {
    product: "",
    brand: "",
    model: "",
    color: "",
    price: {
      min: null,
      max: null,
    },
    range: { min: null, max: null },
    isAscending: false,
  },
}

export const productFilterReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT": {
      return { ...state, loading: true, error: null }
    }
    case "FETCH_SUCCESS": {
      return { ...state, products: action.payload, loading: false, error: null }
    }
    case "FETCH_FAIL": {
      return { ...state, loading: false, error: action.payload }
    }
    case "SET_FILTER": {
      return {
        ...state,
        prodFilter: {
          ...state.prodFilter,
          [action.payload.attribute]: action.payload.value,
        },
      }
    }
    case "SET_PRICE_FILTER": {
      return {
        ...state,
        prodFilter: {
          ...state.prodFilter,
          price: {
            ...state.prodFilter.price,
            [action.payload.attribute]: action.payload.value,
          },
        },
      }
    }
    case "SET_RANGE_FILTER": {
      return {
        ...state,
        prodFilter: {
          ...state.prodFilter,
          range: {
            ...state.prodFilter.range,
            [action.payload.attribute]: action.payload.value,
          },
        },
      }
    }
    case "RESET_FILTERS": {
      return {
        ...state,
        prodFilter: productIncialFilter.prodFilter,
      }
    }
    case "TOGGLE_SORT_ORDER": {
      return {
        ...state,
        prodFilter: {
          ...state.prodFilter,
          isAscending: !state.prodFilter.isAscending,
        },
      }
    }

    default: {
      console.log("unknown action")
      return state
    }
  }
}
