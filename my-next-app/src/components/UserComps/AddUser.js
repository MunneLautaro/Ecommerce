"use client"
import { addUser } from "../../services/index"
import MyButton from "../Ui/MyButton"
import MyInput from "../Ui/MyInput"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function AddUser() {
  const [response, setResponse] = useState(null)

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
          const form = new FormData(e.target)
          const modResponse = await addUser(form)
          setResponse(modResponse)
        }}
        className="flex flex-col justify-between items-center justify-around bg-[#424242] h-[200px] w-[300px] rounded-[10px] mt-2"
      >
        <div className="flex flex-col items-center">
          <div className="min-h-[150px] ">
            <MyInput iName={"user"} iPlaceHolder={"User"} iIsRequired={true} />

            <div className="mt-5">
              <MyInput
                iType={"password"}
                iName={"password"}
                iPlaceHolder={"Password"}
                iIsRequired={true}
              />
            </div>
          </div>
          <MyButton bText={"Add user"} bType={"submit"} />
        </div>
      </form>
    </>
  )
}
