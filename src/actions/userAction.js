"use server"
import { actionUser } from "./serverActionUser"
import { requireAuth } from "../lib/session"
import {
  addUser,
  modifyUser,
  deleteUser,
  getUsers,
  setPersonalInfo,
  removePersonalInfo,
  getUserPersonalInfo,
} from "../controllers/index"

const addUserAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })

  if (!authorized) {
    return { error }
  }

  const user = formData?.user
  const userAgent = formData?.userAgent
  const password = formData?.password

  const result = await addUser(user, password, userAgent)

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
  const password = formData?.password
  const userAgent = formData?.userAgent

  const res = await modifyUser(
    currentUsername,
    newUsername,
    password,
    userAgent,
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

const getUsersAction = async () => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: true,
  })
  if (!authorized) {
    return { error }
  }

  const users = await getUsers()
  return users
}

const getUserPersonalInfoAction = async () => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: false,
  })
  if (!authorized) {
    return { error }
  }
  const user = session.username
  const res = await getUserPersonalInfo(user)
  return res
}

const setPersonalInfoAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: false,
  })
  if (!authorized) {
    return { error }
  }
  if (!formData?.personalInfo) {
    return { error: "Missing personal info" }
  }
  if (!session?.username) {
    return { error: "Session not valid" }
  }

  const user = session.username
  const personalInfo = formData?.personalInfo
  const res = await setPersonalInfo(user, personalInfo)
  actionUser()
  return res
}

const removePersonalInfoAction = async (formData) => {
  const { authorized, error, session } = await requireAuth({
    requireAdmin: false,
  })
  if (!authorized) {
    return { error }
  }
  const user = session.username
  const res = await removePersonalInfo(user)
  actionUser()
  return res
}

export {
  addUserAction,
  modUserAction,
  deleteUserAction,
  getUsersAction,
  getUserPersonalInfoAction,
  setPersonalInfoAction,
  removePersonalInfoAction,
}
