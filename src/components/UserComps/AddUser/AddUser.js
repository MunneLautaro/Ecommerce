"use client"
import { addUserAction } from "../../../actions/index"
import Button from "../../Ui/Button/Button"
import Input from "../../Ui/Input/Input"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function AddUser() {
  const [response, setResponse] = useState(null)
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    userAgent: null,
  })

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userAgent: window.navigator.userAgent,
    }))
  }, [])

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
        const addResponse = await addUserAction(formData)
        setResponse(addResponse)
      }}
      className="flex flex-col gap-4 w-full max-w-sm bg-[#2a2a2a] border border-white/10 shadow-lg rounded-xl p-5"
    >
      <h3 className="text-base font-semibold text-gray-100 text-center">
        Add User
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="addUsername"
            className="text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <Input
            id="addUsername"
            name={"user"}
            placeHolder={"Username"}
            required={true}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, user: e?.target?.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="addPassword"
            className="text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <Input
            id="addPassword"
            type={"password"}
            name={"password"}
            placeHolder={"Password"}
            required={true}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e?.target?.value,
              }))
            }
          />
        </div>
      </div>

      <Button
        text={"Add user"}
        type={"submit"}
        disabled={!(formData.password && formData.user)}
      />
    </form>
  )
}
