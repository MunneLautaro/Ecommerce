"use server"
import { actionUser } from "./serverActionUser"
import { requireAuth } from "../lib/session"
import { addUser, modifyUser, deleteUser } from "../controllers/index"

const addUserAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const user = formData?.user
  const userAgent = formData?.userAgent
  const md5 = formData?.md5
  const sha1 = formData?.sha1

  const result = await addUser(user, md5, sha1, userAgent)

  actionUser()

  return result
}

const modUserAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const currentUsername = formData?.user
  const newUsername = formData?.newUser
  const md5 = formData?.md5
  const sha1 = formData?.sha1
  const userAgent = formData?.userAgent

  const res = await modifyUser(
    currentUsername,
    newUsername,
    md5,
    sha1,
    userAgent
  )

  actionUser()

  return res
}

const deleteUserAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const user = formData?.user

  const res = await deleteUser(user)

  actionUser()

  return res
}

export { addUserAction, modUserAction, deleteUserAction }
