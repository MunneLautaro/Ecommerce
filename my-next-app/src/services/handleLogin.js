"use server"

import CryptoJS from "crypto-js"

export async function handleLogin(formData) {
  const usuario = formData.get("usuario")
  const password = formData.get("password")

  let cMD5 = CryptoJS.MD5(password).toString()
  let cSHA1 = CryptoJS.SHA1(password).toString()
  const res = await fetch(`http://localhost:3000/api/getUsuarioMongoDB`, {
    method: "POST",
    body: JSON.stringify({
      user: usuario,
    }),
    headers: { "content-type": "application/json" },
  })
  let data = await res.json()
  if (data?.usuario?.md5 === cMD5 && data?.usuario?.sha1 === cSHA1) {
    return data
  }

  return "Invalid credentials"
}
