"use client"
import { useRouter } from "next/navigation"
import MyButton from "../Ui/MyButton"
import MyInput from "../Ui/MyInput"
import { useEffect, useState } from "react"
import { login } from "../../actions/index"

export function LoginForm() {
  const [response, setResponse] = useState(null)
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (!response) return
    if (response?.user?.user) {
      if (response?.user?.isAdmin) {
        router.push("/adminPage")
      } else {
        router.push("/catalog")
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
          const form = new FormData(e.target)
          const loginResponse = await login(form)
          setResponse(loginResponse)
        }}
      >
        <MyInput iId={"user"} iName={"user"} iPlaceHolder={"Username"} />
        <MyInput
          iId={"password"}
          iName={"password"}
          iPlaceHolder={"Password"}
        />
        <MyButton bText={"Sign in"} bType={"submit"} underline={"underline"} />
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
/*

*/
