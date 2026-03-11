export const initialCheckOut = {
  orderNumber: null,
  personalInfo: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  },
  isFormOpen: true,
  saveForLater: false,
}

export const checkOutReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDER_NUMBER":
      return { ...state, orderNumber: action.payload }

    case "SET_USER_DATA":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      }

    case "SET_DELIVERY_ADDRESS_DATA":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          deliveryAddress: {
            ...state.personalInfo.deliveryAddress,
            ...action.payload,
          },
        },
      }

    case "SET_FORM_OPEN":
      return { ...state, isFormOpen: action.payload }

    case "SET_USER_INFO":
      return { ...state, personalInfo: action.payload }

    case "SET_SAVE_FOR_LATER":
      return { ...state, saveForLater: !state.saveForLater }

    default:
      return state
  }
}
