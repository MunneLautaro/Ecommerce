"use client"
import { useRouter } from "next/navigation"
import Button from "../Ui/Button/Button"
import Input from "../Ui/Input/Input"
import { useEffect, useState, useContext } from "react"
import { login } from "../../actions/index"
import CryptoJS from "crypto-js"
import { SessionContext } from "@/contexts/SessionContext"

export function LoginForm() {
  const [response, setResponse] = useState(null)
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [user, setUser] = useState({ user: "", md5: "", sha1: "" })
  const [, dispatchSession] = useContext(SessionContext)

  const handleGoogleResponse = async (googleResponse) => {
    try {
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleResponse.credential }),
      })

      const data = await result.json()

      if (data.success) {
        dispatchSession({ type: "SET_SESSION" })
        dispatchSession({ type: "SET_USER", payload: data.user })
        if (data.user.isAdmin) {
          router.push("/adminPage")
        } else {
          router.push("/")
        }
      } else {
        setError(data.error || "Error al iniciar sesión con Google")
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
          setError(null)
        }, 3000)
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Error al conectar con Google")
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
        setError(null)
      }, 3000)
    }
  }

  useEffect(() => {
    if (!response) return
    if (response?.user?.user) {
      dispatchSession({ type: "SET_SESSION" })
      dispatchSession({ type: "SET_USER", payload: response.user })
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
  }, [response, router, dispatchSession])

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        })

        const buttonDiv = document.getElementById("googleSignInButton")
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: "outline",
            size: "large",
          })
        }
      }
    }

    if (window.google) {
      initializeGoogleSignIn()
    } else {
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogleSignIn
      document.body.appendChild(script)
    }
  }, [])

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
        <label
          htmlFor="user"
          className="text-sm font-medium text-gray-200 mb-1"
        >
          Username
        </label>
        <Input
          id={"user"}
          name={"user"}
          placeHolder={"Username"}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, user: e?.target?.value }))
          }
        />
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-200 mb-1 mt-2"
        >
          Password
        </label>
        <Input
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

        <Button text={"Log in"} type={"submit"} />
      </form>

      <div className="mt-4">
        <div id="googleSignInButton"></div>
      </div>

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
