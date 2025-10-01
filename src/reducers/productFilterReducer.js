export const productIncialFilter = {
  product: "",
  brand: "",
  model: "",
  color: "",
  price: "",
}

export const productFilterReducer = (state, action) => {
  switch (action.type) {
    case "filter": {
      return { ...state, [action.payload.attrib]: action.payload.value }
    }

    default: {
      alert("Unknown action")
    }
  }
}
