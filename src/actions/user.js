"use server"

import { actionUser } from "./serverActionUser"
import CryptoJS from "crypto-js"

const addUser = async (formData) => {
  const user = formData.get("user")
  const password = formData.get("password")

  const md5 = CryptoJS.MD5(password).toString()
  const sha1 = CryptoJS.SHA1(password).toString()

  const res = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    body: JSON.stringify({ user, md5, sha1 }),
    headers: { "Content-Type": "application/json" },
  })

  let body = await res.json()
  return body
}

const deleteUser = async (formData) => {
  const user = formData.get("user")

  const res = await fetch("http://localhost:3000/api/users", {
    method: "DELETE",
    body: JSON.stringify({ user }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()
  let body = await res.json()
  return body
}

const modUser = async (formData) => {
  const currentUsername = formData.get("user")
  const newUsername = formData.get("newUser")
  const newPassword = formData.get("newPassword")

  const res = await fetch("http://localhost:3000/api/users", {
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

export { addUser, deleteUser, modUser }
