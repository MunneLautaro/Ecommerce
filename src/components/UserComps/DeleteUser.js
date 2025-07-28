"use client"
import { deleteUser } from "../../actions/index"
import MyButton from "../Ui/MyButton"
import MyInput from "../Ui/MyInput"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function DeleteUser() {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!response) return

    if (response?.message) {
      toast.success(response?.message)
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
          const modResponse = await deleteUser(form)
          setResponse(modResponse)
        }}
        className="flex flex-col justify-between items-center justify-around bg-[#424242] h-[200px] w-[300px] rounded-[10px]"
      >
        <div className="flex flex-col items-center ">
          <div className="min-h-[150px] ">
            <MyInput iName={"user"} iPlaceHolder={"User"} iIsRequired={true} />
          </div>

          <MyButton bText={"Delete user"} bType={"submit"} />
        </div>
      </form>
    </>
  )
}
