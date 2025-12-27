export const initialItems = {
  items: null,
  currentItem: null,
  loading: true,
  error: null,
  itemFilter: {
    type: "",
  },
  newValue: "",
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

    case "SET_ITEM": {
      console.log("setting item in reducer", action.payload)
      return {
        ...state,
        currentItem: action.payload,
        newValue: initialItems.newValue,
      }
    }

    case "CLEAR_NEW_VALUE": {
      return {
        ...state,
        newValue: initialItems.newValue,
      }
    }

    case "SET_NEW_VALUE": {
      return { ...state, newValue: action.payload }
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

    case "RESET_CURRENT_ITEM": {
      return {
        ...state,
        currentItem: initialItems.currentItem,
      }
    }

    default: {
      console.log("unkown action")
      return state
    }
  }
}
