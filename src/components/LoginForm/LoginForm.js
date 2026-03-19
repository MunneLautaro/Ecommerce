"use client"
import { useRouter } from "next/navigation"
import Button from "../Ui/Button/Button"
import Input from "../Ui/Input/Input"
import { useEffect, useState, useContext } from "react"
import { login } from "../../actions/index"
import { SessionContext } from "@/contexts/SessionContext"

export function LoginForm() {
  const [response, setResponse] = useState(null)
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [user, setUser] = useState({ user: "", password: "" })
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
        const sessionResponse = await fetch("/api/session")
        const sessionData = await sessionResponse.json()

        if (sessionData.session) {
          dispatchSession({ type: "SET_SESSION" })
          dispatchSession({ type: "SET_USER", payload: sessionData.user })
        }

        if (data.user.isAdmin) {
          router.push("/adminPage")
        } else {
          router.push("/")
        }
        router.refresh()
      } else {
        setError(data.error || "Error signing in with Google")
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
          setError(null)
        }, 3000)
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Error connecting to Google")
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
      router.refresh()
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
        className="flex flex-col bg-[#424242] p-[30px] m-5 rounded border border-bg-[#d3d3d3]"
        onSubmit={async (e) => {
          e.preventDefault()
          const loginResponse = await login(user)
          setResponse(loginResponse)
        }}
      >
        <label
          htmlFor="user"
          className="text-sm font-medium text-gray-200 mb-1 pl-1"
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
          className="text-sm font-medium text-gray-200 mb-1 mt-2 pl-1"
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
              password: e?.target?.value,
            }))
          }
        />

        <div className="flex mt-3 justify-center">
          <Button text={"Sign in"} type={"submit"} />
        </div>
      </form>

      <div className="mt-4">
        <div id="googleSignInButton"></div>
      </div>

      <div
        className={`
        ${error ? "bg-red-400 mt-5 rounded-sm p-3" : ""} 
        w-fit
      `}
      >
        {showError && error ? <p>{error}</p> : ""}
      </div>
    </div>
  )
}
