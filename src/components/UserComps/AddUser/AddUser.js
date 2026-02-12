"use client"
import { addUserAction } from "../../../actions/index"
import Button from "../../Ui/Button/Button"
import Input from "../../Ui/Input/Input"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CryptoJS from "crypto-js"

export default function AddUser() {
  const [response, setResponse] = useState(null)
  const [formData, setFormData] = useState({
    user: "",
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
          const addResponse = await addUserAction(formData)
          setResponse(addResponse)
        }}
        className="flex flex-col justify-between items-center bg-[#424242] shadow-2xl h-[200px] w-[300px] rounded-[10px] mt-2"
      >
        <div className="flex flex-col items-center">
          <div className="min-h-[150px] ">
            <label
              htmlFor="addUsername"
              className="text-sm font-medium text-gray-200"
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
            <div className="mt-5">
              <label
                htmlFor="addPassword"
                className="text-sm font-medium text-gray-200"
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
                    md5: CryptoJS.MD5(e?.target?.value).toString(),
                    sha1: CryptoJS.SHA1(e?.target?.value).toString(),
                  }))
                }
              />
            </div>
          </div>
          <Button
            text={"Add user"}
            type={"submit"}
            disabled={!(formData.sha1 && formData.user)}
          />
        </div>
      </form>
    </>
  )
}
