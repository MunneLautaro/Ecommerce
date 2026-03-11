export const initialFormState = {
  form: {
    sku: "",
    product: "",
    img: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    price: "",
    stock: "",
  },
  response: null,
}

export const productFormReducer = (state, action) => {
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

    case "SET_PRODUCT": {
      return { ...state, form: { ...state.form, ...action.payload } }
    }

    case "CLEAR_FORM": {
      return initialFormState
    }

    case "SET_RESPONSE": {
      return { ...state, response: action.payload }
    }

    case "CLEAR_RESPONSE": {
      return { ...state, response: null }
    }

    default: {
      console.log("unknown action")
      return state
    }
  }
}
