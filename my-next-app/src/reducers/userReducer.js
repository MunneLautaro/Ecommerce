export const initialState = {
  user: "",
  md5: "",
  sha1: "",
  isAdmin: false,
}

export const logInReducer = (state, action) => {
  switch (action.type) {
    case "logIn": {
      return { ...state, ...action.payload }
    }
    case "logOut": {
      return { ...state, ...initialState }
    }
    default: {
      alert("Login error")
      return state
    }
  }
}
