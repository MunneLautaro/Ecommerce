"use server"

import { actionUser } from "./serverActionUser"

export async function deleteUser(formData) {
  const usuario = formData.get("usuario")

  const res = await fetch("http://localhost:3000/api/usuariosMongoDB", {
    method: "DELETE",
    body: JSON.stringify({ usuarioAEliminar: usuario }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()
  let body = await res.json()
  return body
}
