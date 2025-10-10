"use client"
import { modUser } from "../../../actions/index"
import MyButton from "../../Ui/MyButton/MyButton"
import MyInput from "../../Ui/MyInput/MyInput"
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
          const modResponse = await modUser(formData)
          setResponse(modResponse)
        }}
        className="flex flex-col justify-between items-center bg-[#424242] h-[200px] w-[300px] rounded-[10px]"
      >
        <div className="flex flex-col items-center ">
          <div className="min-h-[150px] ">
            <MyInput
              name={"user"}
              placeHolder={"Username"}
              required={true}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, user: e?.target?.value }))
              }
            />
            <div className="mt-4">
              <MyInput
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
              <MyInput
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

          <MyButton text={"Modify user"} buttonType={"submit"} />
        </div>
      </form>
    </>
  )
}
