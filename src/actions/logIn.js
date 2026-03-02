"use server"

import { createSession, deleteSession } from "../lib/session"
import { redirect } from "next/navigation"
import { getUser } from "@/controllers/index"
import bcrypt from "bcryptjs"

export async function login(formData) {
  const user = formData?.user
  const password = formData?.password

  if (!user || !password) {
    return { errors: { login: "Complete all fields" } }
  }

  const currentUser = await getUser(user)

  if (
    !currentUser?.user?.user ||
    !currentUser?.user?.password ||
    !(await bcrypt.compare(password, currentUser.user.password))
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
