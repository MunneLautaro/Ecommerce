"use client"
import { deleteUserAction } from "../../../actions/index"
import Input from "../../Ui/Input/Input"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ConfirmActionButton from "@/components/Ui/Button/ConfirmActionButton"

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
        Delete User
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="deleteUser"
            className="text-sm font-medium text-gray-300 pl-1"
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

      <ConfirmActionButton
        buttonChildren={"Delete user"}
        modalTittle={"Confirm Delete User"}
        modalMessage={`Are you sure you want to delete the user: ${formData.user}?`}
        isDisabled={!formData.user}
        onConfirm={async () => {
          const delResponse = await deleteUserAction(formData)
          setResponse(delResponse)
        }}
      />
    </form>
  )
}
