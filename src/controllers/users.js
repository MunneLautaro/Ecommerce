import { connectWithSSH } from "../dbMongo"
import User from "../models/userModel"
import CryptoJS from "crypto-js"

async function getUser(user) {
  try {
    let currentUser = await User.findOne({ user: user })
    if (!currentUser) {
      return { error: `The user ${currentUser} does not exists.`, status: 404 }
    }
    return { user: currentUser, status: 200 }
  } catch (error) {
    return { error: error }
  }
}

const getUsers = async () => {
  try {
    await connectWithSSH()
  } catch (error) {
    return error
  }

  const users = await User.find({})
  return { users: users, status: 200 }
}

const addUser = async (user, md5, sha1, device) => {
  await connectWithSSH()

  try {
    const currentUser = await getUser(user)

    if (currentUser) {
      return { error: "The user already exists" }
    }

    const newUser = new User({
      user: user,
      md5: md5,
      sha1: sha1,
      device: device,
      activeSession: true,
    })

    await newUser.save()
    return { success: "User successfully registered", status: 201 }
  } catch (error) {
    return { error: error }
  }
}

const deleteUser = async (user) => {
  try {
    await connectWithSSH()

    const currentUser = await getUser(user)

    await User.deleteOne({ user: currentUser })

    return { success: "The user was successfully deleted" }
  } catch (error) {
    return { error: error }
  }
}

const modifyUser = async (currentUsername, newUsername, newPassword) => {
  try {
    await connectWithSSH()

    const currentUser = await getUser(currentUsername)

    if (!currentUser) {
      return { error: `The user: ${currentUsername}. Doesn't exists` }
    }

    const newUser = await getUser(newUsername)

    if (newUser) {
      return { error: "User is already in use" }
    }

    await User.replaceOne(
      { user: currentUsername },
      {
        user: nuevoUser,
        md5: CryptoJS.MD5(newPassword).toString(),
        sha1: CryptoJS.SHA1(newPassword).toString(),
        device: request.headers.get("user-agent") || "",
        activeSession: true,
      }
    )
    return { success: "The user was successfully modified" }
  } catch (error) {
    return { error: error }
  }
}

export { getUsers, addUser, deleteUser, modifyUser }
