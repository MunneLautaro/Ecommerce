"use server"

import { actionUser } from "./serverActionUser"
import CryptoJS from "crypto-js"

const addUser = async (formData) => {
  const usuario = formData.get("user")
  const password = formData.get("password")

  const passMD5 = CryptoJS.MD5(password).toString()
  const passSHA1 = CryptoJS.SHA1(password).toString()

  const res = await fetch("http://localhost:3000/api/userController", {
    method: "POST",
    body: JSON.stringify({ usuario, passMD5, passSHA1 }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()

  let body = await res.json()
  return body
}

const deleteUser = async (formData) => {
  const usuario = formData.get("usuario")

  const res = await fetch("http://localhost:3000/api/userController", {
    method: "DELETE",
    body: JSON.stringify({ usuarioAEliminar: usuario }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()
  let body = await res.json()
  return body
}

const modUser = async (formData) => {
  const user = formData.get("user")
  const newUser = formData.get("newUser")
  const newPassword = formData.get("newPassword")

  const res = await fetch("http://localhost:3000/api/userController", {
    method: "PUT",
    body: JSON.stringify({
      anteriorUser: user,
      nuevoUser: newUser,
      nuevaPass: newPassword,
    }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()

  let body = await res.json()
  return body
}

export { addUser, deleteUser, modUser }
