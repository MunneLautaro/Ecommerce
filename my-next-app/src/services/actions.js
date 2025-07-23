"use server"

import CryptoJS from "crypto-js"
import { createSession, deleteSession } from "../lib/session"
import { redirect } from "next/navigation"

export async function login(formData) {
  const user = formData.get("user")
  const password = formData.get("password")

  let cMD5 = CryptoJS.MD5(password).toString()
  let cSHA1 = CryptoJS.SHA1(password).toString()

  const response = await fetch("http://localhost:3000/api/getUserData", {
    method: "POST",
    body: JSON.stringify({
      user: user,
    }),
    headers: { "content-type": "application/json" },
  })

  const currentUser = await response.json()

  if (!user || !password) {
    return { errors: { login: "Complete all fields" } }
  }
  if (
    !currentUser?.userData?.user ||
    currentUser?.userData?.md5 !== cMD5 ||
    currentUser?.userData?.sha1 !== cSHA1
  ) {
    return { errors: { login: "Invalid credentials" } }
  }
  await createSession(
    currentUser?.userData?._id,
    currentUser?.userData?.user,
    currentUser?.userData?.isAdmin
  )

  return { user: JSON.parse(JSON.stringify(currentUser.userData)) }
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}
