"use client"
import ConfirmActionButton from "@/components/Ui/Button/ConfirmActionButton"
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
    setResponse(null)
  }, [response])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
      }}
      className="flex flex-col gap-4 w-full max-w-sm bg-[#2a2a2a] border border-bg-[#d3d3d3] shadow-md rounded-xl p-5"
    >
      <h3 className="text-base font-semibold text-gray-100 text-center">
        Add User
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="addUsername"
            className="text-sm font-medium text-gray-300 pl-1"
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
            className="text-sm font-medium text-gray-300 pl-1"
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

      <ConfirmActionButton
        buttonChildren={"Add user"}
        modalTittle={"Confirm Add User"}
        modalMessage={`Are you sure you want to add the user: ${formData.user}?`}
        isDisabled={!(formData.password && formData.user)}
        onConfirm={async () => {
          const addResponse = await addUserAction(formData)
          setResponse(addResponse)
        }}
      />
    </form>
  )
}
