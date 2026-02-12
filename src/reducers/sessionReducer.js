export const initialSession = {
  session: false,
  user: null,
}

export const sessionReducer = (state, action) => {
  switch (action.type) {
    case "SET_SESSION":
      localStorage.setItem("session", true)
      return {
        ...state,
        session: true,
      }

    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload,
      }
    case "CLEAR_SESSION":
      localStorage.removeItem("user")
      localStorage.removeItem("session")
      return {
        ...state,
        session: false,
        user: null,
      }
    default:
      return state
  }
}
