"use server"

import CryptoJS from "crypto-js"
import { createSession, deleteSession } from "../lib/session"
import { redirect } from "next/navigation"

export async function login(formData) {
  const user = formData.get("user")
  const password = formData.get("password")

  let cMD5 = CryptoJS.MD5(password).toString()
  let cSHA1 = CryptoJS.SHA1(password).toString()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FULL_URL}/api/checkUser`,
    {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),
      headers: { "content-type": "application/json" },
    }
  )

  const currentUser = await response.json()

  if (!user || !password) {
    return { errors: { login: "Complete all fields" } }
  }

  if (
    !currentUser?.result?.user ||
    currentUser?.result?.md5 !== cMD5 ||
    currentUser?.result?.sha1 !== cSHA1
  ) {
    return { errors: { login: "Invalid credentials" } }
  }
  await createSession(
    currentUser?.result?._id,
    currentUser?.result?.user,
    currentUser?.result?.isAdmin
  )

  return { user: JSON.parse(JSON.stringify(currentUser?.result)) }
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}
