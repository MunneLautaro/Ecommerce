"use client"
import Input from "../../Ui/Input/Input"
import ConfirmActionButton from "@/components/Ui/Button/ConfirmActionButton"
import { modUserAction } from "../../../actions/index"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function ModUser() {
  const [response, setResponse] = useState(null)
  const [formData, setFormData] = useState({
    user: "",
    newUser: "",
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
        const modResponse = await modUserAction(formData)
        setResponse(modResponse)
      }}
      className="flex flex-col gap-4 w-full max-w-sm bg-[#2a2a2a] border border-bg-[#d3d3d3] shadow-md rounded-xl p-5"
    >
      <h3 className="text-base font-semibold text-gray-100 text-center">
        Modify User
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="user"
            className="text-sm font-medium text-gray-300 pl-1"
          >
            Current Username
          </label>
          <Input
            id="user"
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
            htmlFor="newUser"
            className="text-sm font-medium text-gray-300 pl-1"
          >
            New Username
          </label>
          <Input
            id="newUser"
            name={"newUser"}
            placeHolder={"New username"}
            required={true}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newUser: e?.target?.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-300 pl-1"
          >
            New Password
          </label>
          <Input
            id="newPassword"
            type={"password"}
            name={"newPassword"}
            placeHolder={"New password"}
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
        buttonChildren={"Modify user"}
        modalTittle={"Confirm Modify User"}
        modalMessage={`Are you sure you want to modify the user: ${formData.user}?`}
        isDisabled={!(formData.password && formData.user && formData.newUser)}
        onConfirm={async () => {
          const modResponse = await modUserAction(formData)
          setResponse(modResponse)
        }}
      />
    </form>
  )
}
