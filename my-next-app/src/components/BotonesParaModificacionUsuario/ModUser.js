"use client";
import { modUser } from "../../services/index";
import MyButton from "../Ui/MyButton";
import MyInput from "../Ui/MyInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ModificarUsuario() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!response) return;

    if (response?.success) {
      toast.success(response?.success);
    } else {
      toast.error(response?.error);
    }
  }, [response]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.target);
          const modResponse = await modUser(form);
          setResponse(modResponse);
        }}
        className="flex flex-col justify-between items-center bg-[#424242] h-[200px] w-[300px] rounded-[10px]"
      >
        <div className="flex flex-col items-center ">
          <div className="min-h-[150px] ">
            <MyInput iName={"user"} iPlaceHolder={"User"} iIsRequired={true} />
            <div className="mt-4">
              <MyInput
                iName={"newUser"}
                iPlaceHolder={"New user"}
                iIsRequired={true}
              />
            </div>
            <div className="mt-4">
              <MyInput
                iType={"password"}
                iName={"newPassword"}
                iPlaceHolder={"New password"}
                iIsRequired={true}
              />
            </div>
          </div>

          <MyButton bText={"Modify user"} buttonType={"submit"} />
        </div>
      </form>
    </>
  );
}
