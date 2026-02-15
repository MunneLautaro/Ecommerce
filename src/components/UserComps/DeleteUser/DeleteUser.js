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
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const delResponse = await deleteUserAction(formData)
        setResponse(delResponse)
      }}
      className="flex flex-col gap-4 w-full max-w-sm bg-[#2a2a2a] border border-white/10 shadow-lg rounded-xl p-5"
    >
      <h3 className="text-base font-semibold text-gray-100 text-center">
        Delete User
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="deleteUser"
            className="text-sm font-medium text-gray-300"
          >
            Username to Delete
          </label>
          <Input
            id="deleteUser"
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
      </div>

      <Button text={"Delete user"} type={"submit"} disabled={!formData.user} />
    </form>
  )
}
