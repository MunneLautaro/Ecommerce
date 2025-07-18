"use client";

import { login } from "@/services/actions";
import { useActionState } from "react";
import MyButton from "../Ui/MyButton";
import MyInput from "../Ui/MyInput";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, null);

  return (
    <div className="flex items-center justify-center p-5">
      <form
        className="flex flex-col bg-[#424242] p-[30px] m-5 rounded"
        action={loginAction}
      >
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <MyInput iId={"user"} iName={"user"} iPlaceHolder={"Username"} />
        <MyInput
          iId={"password"}
          iName={"password"}
          iPlaceHolder={"Password"}
        />
        {state?.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
        <MyButton bText={"Sing in"} bType={"submit"} underline={"underline"} />
      </form>
    </div>
  );
}
