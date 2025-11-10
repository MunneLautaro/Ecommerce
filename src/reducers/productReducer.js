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
}

export const productFormReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT": {
      return { ...state, form: { ...state.form, ...action.payload } }
    }

    case "CLEAR_FORM": {
      return initialFormState // Retorna el estado inicial
    }

    default: {
      console.log("unknown action")
      return state
    }
  }
}
