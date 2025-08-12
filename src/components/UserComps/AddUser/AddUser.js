"use client"
import { userAgent } from "next/server"
import { addUserAction } from "../../../actions/index"
import MyButton from "../../Ui/MyButton"
import MyInput from "../../Ui/MyInput"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function AddUser() {
  const [response, setResponse] = useState(null)
  const [form, setForm] = useState({
    user: "",
    password: "",
    userAgent: window?.navigator?.userAgent || null,
  })

  useEffect(() => {
    if (!response) return
    if (response?.success) {
      toast.success(response?.success)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const addResponse = await addUserAction(form)
          setResponse(addResponse)
        }}
        className="flex flex-col justify-between items-center justify-around bg-[#424242] h-[200px] w-[300px] rounded-[10px] mt-2"
      >
        <div className="flex flex-col items-center">
          <div className="min-h-[150px] ">
            <MyInput
              iName={"user"}
              iPlaceHolder={"Username"}
              iIsRequired={true}
              iOnChange={(e) =>
                setForm((prev) => ({ ...prev, user: e.target.value }))
              }
            />

            <div className="mt-5">
              <MyInput
                iType={"password"}
                iName={"password"}
                iPlaceHolder={"Password"}
                iIsRequired={true}
                iOnChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </div>
          <MyButton bText={"Add user"} bType={"submit"} />
        </div>
      </form>
    </>
  )
}
