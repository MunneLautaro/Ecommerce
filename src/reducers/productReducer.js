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
      console.log("Se llama a set product", action.payload)
      return { ...state, form: { ...action.payload } }
    }

    case "CLEAR_FORM": {
      return state
    }

    default: {
      console.log("unkown action")
      return state
    }
  }
}
