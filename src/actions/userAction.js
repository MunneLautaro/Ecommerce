"use server"
import { actionUser } from "./serverActionUser"
import CryptoJS from "crypto-js"

const addUserAction = async (formData) => {
  const user = formData?.user
  const password = formData?.password
  const userAgent = formData?.userAgent

  const md5 = CryptoJS.MD5(password).toString()
  const sha1 = CryptoJS.SHA1(password).toString()

  //const result = await addUser(user, md5, sha1, userAgent)
  const res = await fetch(`${process.env.NEXT_FULL_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify({ user, md5, sha1, userAgent }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()

  return result
}

const deleteUser = async (formData) => {
  const user = formData.get("user")

  const res = await fetch(`${process.env.NEXT_FULL_URL}/api/users`, {
    method: "DELETE",
    body: JSON.stringify({ user }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()
  let body = await res.json()
  return body
}

const modUser = async (formData) => {
  const currentUsername = formData?.user
  const newUsername = formData?.newUser
  const newPassword = formData?.newPassword
  //
  const res = await fetch(`${process.env.NEXT_FULL_URL}/api/users`, {
    method: "PUT",
    body: JSON.stringify({
      currentUsername,
      newUsername,
      newPassword,
    }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()

  let body = await res.json()
  return body
}

export { addUserAction, deleteUser, modUser }
