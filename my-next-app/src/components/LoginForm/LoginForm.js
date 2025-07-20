"use client";
import { useRouter } from "next/navigation";
import MyButton from "../Ui/MyButton";
import MyInput from "../Ui/MyInput";
import { useContext, useEffect, useState } from "react";
import { UserDispatchContext } from "../../contexts/UserContext";
import { login } from "../../services/actions";

export function LoginForm() {
  const [response, setResponse] = useState(null);
  const dispatchUser = useContext(UserDispatchContext);
  const router = useRouter();

  useEffect(() => {
    if (!response) return;
    if (response?.user?.user) {
      dispatchUser({ type: "logIn", payload: response.user });

      if (response?.user?.isAdmin) {
        router.push("/prueba");
      } else {
        router.push("/prueba");
      }
    }
  }, [response, router, dispatchUser]);

  return (
    <div className="flex items-center justify-center p-5">
      <form
        className="flex flex-col bg-[#424242] p-[30px] m-5 rounded"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.target);
          console.log(e.target);
          const loginResponse = await login(form);
          setResponse(loginResponse);
        }}
      >
        {response?.errors?.email && (
          <p className="text-red-500">{response.errors.email}</p>
        )}
        <MyInput iId={"user"} iName={"user"} iPlaceHolder={"Username"} />
        <MyInput
          iId={"password"}
          iName={"password"}
          iPlaceHolder={"Password"}
        />
        {response?.errors?.password && (
          <p className="text-red-500">{response.errors.password}</p>
        )}
        <MyButton bText={"Sign in"} bType={"submit"} underline={"underline"} />
      </form>
    </div>
  );
}
