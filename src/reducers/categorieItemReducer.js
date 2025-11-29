export const initialItems = {
  items: null,
  loading: true,
  error: null,
  itemFilter: {
    type: "",
    value: "",
    prodId: "",
    date: "",
  },
}

export const itemFilterReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT": {
      return { ...state, loading: true, error: null }
    }

    case "FETCH_SUCCESS": {
      return { ...state, items: action.payload, loading: false, error: null }
    }

    case "FETCH_FAIL": {
      return { ...state, loading: false, error: action.payload }
    }

    case "SET_FILTER": {
      return {
        ...state,
        itemFilter: {
          ...state.itemFilter,
          [action.payload.attribute]: action.payload.value,
        },
      }
    }

    case "RESET_FILTERS": {
      return {
        ...state,
        itemFilter: initialItems.itemFilter,
      }
    }

    default: {
      console.log("unkown action")
      return state
    }
  }
}
