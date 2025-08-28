"use server"
import { actionUser } from "./serverActionUser"

const addUserAction = async (formData) => {
  const user = formData?.user
  const userAgent = formData?.userAgent
  const md5 = formData?.md5
  const sha1 = formData?.sha1

  //const result = await addUser(user, md5, sha1, userAgent)
  const res = await fetch(`${process.env.NEXT_FULL_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify({ user, md5, sha1, userAgent }),
    headers: { "Content-Type": "application/json" },
  })
  const result = res.json()
  actionUser()

  return result
}

const deleteUser = async (formData) => {
  const user = formData?.user

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
  const md5 = formData?.md5
  const sha1 = formData?.sha1
  const userAgent = formData?.userAgent
  //
  const res = await fetch(`${process.env.NEXT_FULL_URL}/api/users`, {
    method: "PUT",
    body: JSON.stringify({
      currentUsername,
      newUsername,
      md5,
      sha1,
      userAgent,
    }),
    headers: { "Content-Type": "application/json" },
  })
  actionUser()

  let body = await res.json()
  return body
}

export { addUserAction, deleteUser, modUser }
