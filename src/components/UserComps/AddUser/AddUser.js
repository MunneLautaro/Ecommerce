"use client"
import { addUserAction } from "../../../actions/index"
import MyButton from "../../Ui/MyButton/MyButton"
import MyInput from "../../Ui/MyInput/MyInput"
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
        className="flex flex-col justify-between items-center justify-around bg-[#424242] h-[200px] w-[300px] rounded-[10px] mt-2"
      >
        <div className="flex flex-col items-center">
          <div className="min-h-[150px] ">
            <MyInput
              iName={"user"}
              iPlaceHolder={"Username"}
              iIsRequired={true}
              iOnChange={(e) =>
                setFormData((prev) => ({ ...prev, user: e?.target?.value }))
              }
            />
            <input></input>
            <div className="mt-5">
              <MyInput
                iType={"password"}
                iName={"password"}
                iPlaceHolder={"Password"}
                iIsRequired={true}
                iOnChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    md5: CryptoJS.MD5(e?.target?.value).toString(),
                    sha1: CryptoJS.SHA1(e?.target?.value).toString(),
                  }))
                }
              />
            </div>
          </div>
          <MyButton text={"Add user"} type={"submit"} />
        </div>
      </form>
    </>
  )
}
