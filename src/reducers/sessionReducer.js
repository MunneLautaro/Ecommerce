export const initialSession = {
  session: false,
  user: null,
}

export const sessionReducer = (state, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        session: true,
      }

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "CLEAR_SESSION":
      return {
        ...state,
        session: false,
        user: null,
      }
    default:
      return state
  }
}
