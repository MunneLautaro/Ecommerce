"use client"
import { deleteUser } from "../../../actions/index"
import MyButton from "../../Ui/MyButton/MyButton"
import MyInput from "../../Ui/MyInput/MyInput"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function DeleteUser() {
  const [response, setResponse] = useState(null)
  const [formData, setFormData] = useState({
    user: "",
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
          const modResponse = await deleteUser(formData)
          setResponse(modResponse)
        }}
        className="flex flex-col justify-between items-center justify-around bg-[#424242] h-[200px] w-[300px] rounded-[10px]"
      >
        <div className="flex flex-col items-center ">
          <div className="min-h-[150px] ">
            <MyInput
              iName={"user"}
              iPlaceHolder={"Username"}
              iIsRequired={true}
              iOnChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  user: e?.target?.value,
                }))
              }
            />
          </div>

          <MyButton bText={"Delete user"} bType={"submit"} />
        </div>
      </form>
    </>
  )
}
