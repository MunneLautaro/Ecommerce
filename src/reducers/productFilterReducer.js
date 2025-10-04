export const productIncialFilter = {
  product: "",
  brand: "",
  model: "",
  color: "",
  price: {
    minPrice: 0,
    maxPrice: 100,
  },
  range: {
    minRange: 0,
    maxRange: 100,
  },
}

export const productFilterReducer = (state, action) => {
  switch (action.type) {
    case "filter": {
      return { ...state, [action.payload.attrib]: action.payload.value }
    }
    case "filterPrice": {
      return {
        ...state,
        price: {
          ...state.price,
          [action.payload.attrib]: action.payload.value,
        },
      }
    }
    case "setRange": {
      return {
        ...state,
        range: {
          ...state.range,
          [action.payload.attrib]: action.payload.value,
        },
      }
    }

    default: {
      alert("Unknown action")
    }
  }
}
