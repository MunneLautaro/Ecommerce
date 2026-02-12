"use client"
import { modUserAction } from "../../../actions/index"
import Button from "../../Ui/Button/Button"
import Input from "../../Ui/Input/Input"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CryptoJS from "crypto-js"

export default function ModUser() {
  const [response, setResponse] = useState(null)
  const [formData, setFormData] = useState({
    user: "",
    newUser: "",
    md5: "",
    sha1: "",
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
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const modResponse = await modUserAction(formData)
          setResponse(modResponse)
        }}
        className="flex flex-col justify-between items-center shadow-2xl bg-[#424242] h-[200px] w-[300px] rounded-[10px]"
      >
        <div className="flex flex-col items-center ">
          <div className="min-h-[150px] ">
            <label htmlFor="user" className="text-sm font-medium text-gray-200">
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
            <div className="mt-4">
              <label
                htmlFor="newUser"
                className="text-sm font-medium text-gray-200"
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
            <div className="mt-4">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-200"
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
                    md5: CryptoJS.MD5(e?.target?.value).toString(),
                    sha1: CryptoJS.SHA1(e?.target?.value).toString(),
                  }))
                }
              />
            </div>
          </div>

          <Button
            text={"Modify user"}
            buttonType={"submit"}
            disabled={
              !(
                formData.sha1 &&
                formData.user &&
                formData.newUser &&
                formData.md5
              )
            }
          />
        </div>
      </form>
    </>
  )
}
