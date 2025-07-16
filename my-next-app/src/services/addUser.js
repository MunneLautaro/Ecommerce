"use server"

import { actionUser } from "./serverActionUser"
import CryptoJS from "crypto-js"

export async function addUser(formData) {
  const usuario = formData.get("usuario")
  const password = formData.get("password")

  const passMD5 = CryptoJS.MD5(password).toString()
  const passSHA1 = CryptoJS.SHA1(password).toString()

  const res = await fetch("http://localhost:3000/api/usuariosMongoDB", {
    method: "POST",
    body: JSON.stringify({ usuario, passMD5, passSHA1 }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()

  let body = await res.json()
  return body
}
