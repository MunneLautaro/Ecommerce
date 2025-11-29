"use client"
import { useRouter } from "next/navigation"
import MyButton from "../Ui/MyButton/MyButton"
import MyInput from "../Ui/MyInput/MyInput"
import { useEffect, useState } from "react"
import { login } from "../../actions/index"
import CryptoJS from "crypto-js"

export function LoginForm() {
  const [response, setResponse] = useState(null)
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [user, setUser] = useState({ user: "", md5: "", sha1: "" })

  useEffect(() => {
    if (!response) return
    if (response?.user?.user) {
      if (response?.user?.isAdmin) {
        router.push("/adminPage")
      } else {
        router.push("/")
      }
    } else {
      setError(response?.errors?.login)
      setResponse(null)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
        setError(null)
      }, 3000)
    }
  }, [response, router])

  return (
    <div className="flex items-center justify-center p-5 flex-col">
      <form
        className="flex flex-col bg-[#424242] p-[30px] m-5 rounded"
        onSubmit={async (e) => {
          e.preventDefault()
          const loginResponse = await login(user)
          setResponse(loginResponse)
        }}
      >
        <MyInput
          id={"user"}
          name={"user"}
          placeHolder={"Username"}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, user: e?.target?.value }))
          }
        />
        <MyInput
          id={"password"}
          name={"password"}
          placeHolder={"Password"}
          type={"password"}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              md5: CryptoJS.MD5(e?.target?.value).toString(),
              sha1: CryptoJS.SHA1(e?.target?.value).toString(),
            }))
          }
        />

        <MyButton text={"submit"} type={"submit"} />
      </form>
      <div
        className={`
        ${error ? "bg-red-400 mt-0 rounded-sm p-3" : ""} 
        w-fit
      `}
      >
        {showError && error ? <p>{error}</p> : ""}
      </div>
    </div>
  )
}
