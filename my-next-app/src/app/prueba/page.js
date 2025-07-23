"use client";

import { logut } from "@/services/actions";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

/*@#2*/
export default function Prueba() {
  const user = useContext(UserContext);
  useEffect(() => {
    console.log({ user });
  });
  return (
    <>
      <h1>{user.user}</h1>
      <button onClick={logut}>LOGOUT</button>
    </>
  );
}
