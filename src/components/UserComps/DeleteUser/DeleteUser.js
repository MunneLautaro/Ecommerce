"use client"
import { deleteUserAction } from "../../../actions/index"
import Button from "../../Ui/Button/Button"
import Input from "../../Ui/Input/Input"
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
          const delResponse = await deleteUserAction(formData)
          setResponse(delResponse)
        }}
        className="flex flex-col justify-between items-center shadow-2xl border border-yellow-500 bg-[#424242] h-[200px] w-[300px] rounded-[10px]"
      >
        <div className="flex flex-col items-center ">
          <div className="min-h-[150px] ">
            <Input
              name={"user"}
              placeHolder={"Username"}
              required={true}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  user: e?.target?.value,
                }))
              }
            />
          </div>

          <Button text={"Delete user"} type={"submit"} />
        </div>
      </form>
    </>
  )
}
