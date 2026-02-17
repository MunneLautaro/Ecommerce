"use server"

import { createSession, deleteSession } from "../lib/session"
import { redirect } from "next/navigation"
import { getUser } from "@/controllers/index"

export async function login(formData) {
  const user = formData?.user
  const cMD5 = formData?.md5
  const cSHA1 = formData?.sha1

  if (!user || !cMD5 || !cSHA1) {
    return { errors: { login: "Complete all fields" } }
  }

  const currentUser = await getUser(user)

  if (
    !currentUser?.user?.user ||
    currentUser?.user?.md5 !== cMD5 ||
    currentUser?.user?.sha1 !== cSHA1
  ) {
    return { errors: { login: "Invalid credentials" } }
  }
  await createSession(
    currentUser?.user?._id.toString(),
    currentUser?.user?.user,
    currentUser?.user?.isAdmin,
  )

  return { user: JSON.parse(JSON.stringify(currentUser?.user)) }
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}
