"use client";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";

export const initialState = {
  user: "",
  md5: "",
  sha1: "",
  isAdmin: false,
};

export const logInReducer = (state, action) => {
  switch (action.type) {
    case "logIn": {
      return { ...state, ...action.payload };
    }
    case "logOut": {
      return { ...state, ...initialState };
    }
    default: {
      alert("Login error");
      return state;
    }
  }
};

export function UserProvider({ children }) {
  const [user, dispatchUser] = useReducer(logInReducer, initialState);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatchUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
