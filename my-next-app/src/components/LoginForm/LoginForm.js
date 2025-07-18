"use client";

import { login } from "@/services/actions";
import { useActionState } from "react";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, null);

  return (
    <form action={loginAction}>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <input id="user" name="user" placeholder="Username" />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
      />
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <button type="sumbit">sumbit</button>
    </form>
  );
}
