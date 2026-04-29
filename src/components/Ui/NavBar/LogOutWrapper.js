"use client"

import LogOut from "./LogOut"
import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"

let intervalId = null

export default function LogOutWrapper() {
  const [session, setSession] = useState(true)

  function startInterval() {
    if (intervalId) {
      clearInterval(intervalId)
    }

    intervalId = setInterval(
      async () => {
        const session = getCookie("session")
        setSession(session)
      },
      1000 * 60 * 60,
    )
  }

  useEffect(() => {
    startInterval()
  }, [])

  return !session ? <LogOut /> : null
}
