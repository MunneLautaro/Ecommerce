import { connectWithSSH } from "../dbMongo"
import User from "../models/userModel"
import CryptoJS from "crypto-js"

const getUser = async (user, id) => {
  try {
    await connectWithSSH()
  } catch (error) {
    return error
  }
  try {
    if (!user && !id) {
      return { error: "Missing fields", status: 400 }
    }
    let response
    if (user) {
      response = await User.findOne({ user })
    } else {
      response = await User.findById(id)
    }

    if (!response) {
      return { error: `The user "${user}" does not exists.`, status: 404 }
    }
    return { user: response, status: 200 }
  } catch (error) {
    return { error: error, status: 500 }
  }
}

const getUsers = async () => {
  try {
    await connectWithSSH()
  } catch (error) {
    return error
  }

  const users = await User.find({})
  const plainUsers = JSON.parse(JSON.stringify(users))
  return { users: plainUsers, status: 200 }
}

const addUser = async (user, md5, sha1, device) => {
  try {
    await connectWithSSH()
  } catch (error) {
    return error
  }

  try {
    if (!user || !md5 || !sha1) {
      return { error: "Missing fields", status: 400 }
    }

    const currentUser = await getUser(user)

    if (currentUser?.user) {
      return { error: "The user already exists", status: 409 }
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

    const result = await getUser(user)

    if (result?.error) {
      return { error: result?.error, status: result?.status || 404 }
    }

    await User.deleteOne({ user: user })

    return {
      success: `The user "${user}" was successfully deleted`,
      status: 200,
    }
  } catch (error) {
    return { error: error, status: 500 }
  }
}

const modifyUser = async (
  currentUsername,
  newUsername,
  newPassword,
  device = ""
) => {
  try {
    await connectWithSSH()

    const currentUserResult = await getUser(currentUsername)
    if (currentUserResult?.error) {
      return {
        error: `The user: "${currentUsername}". doesn't exist`,
        status: 404,
      }
    }

    const newUserResult = await getUser(newUsername)
    if (!newUserResult?.error) {
      return {
        error: `The user "${newUsername}" is already in use`,
        status: 409,
      }
    }

    await User.replaceOne(
      { user: currentUsername },
      {
        user: newUsername,
        md5: CryptoJS.MD5(newPassword).toString(),
        sha1: CryptoJS.SHA1(newPassword).toString(),
        device: device,
        activeSession: true,
      }
    )

    return {
      success: `The user "${currentUsername}" was successfully modified`,
      status: 200,
    }
  } catch (error) {
    return { error: error?.message || error, status: 500 }
  }
}

export { getUsers, addUser, deleteUser, modifyUser, getUser }
