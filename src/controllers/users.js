import { validateUsername } from "@/helpers/validateUsername"
import User from "../models/userModel"
//import { connectToDatabase } from "../../connectToDatabase"
import { connectToDatabaseUnix } from "../../connectDBUnix"
import bcrypt from "bcryptjs"

const getUser = async (user, id) => {
  try {
    //await connectToDatabase()
    await connectToDatabaseUnix()
  } catch (error) {
    return error
  }
  try {
    const wrongUsername = validateUsername(user)
    if (wrongUsername) return wrongUsername

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
    //await connectToDatabase()
    await connectToDatabaseUnix()
  } catch (error) {
    return error
  }

  try {
    const users = await User.find({})
    const plainUsers = JSON.parse(JSON.stringify(users))
    return { users: plainUsers, status: 200 }
  } catch (error) {
    return error
  }
}

const addUser = async (user, password, device) => {
  try {
    //await connectToDatabase()
    await connectToDatabaseUnix()
  } catch (error) {
    return error
  }

  try {
    if (!user || !password) {
      return { error: "Missing fields", status: 400 }
    }

    const currentUser = await getUser(user)
    if (currentUser?.user) {
      return { error: "The user already exists", status: 409 }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      user: user,
      password: hashedPassword,
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
    //await connectToDatabase()
    await connectToDatabaseUnix()

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
  password,
  device = "",
) => {
  try {
    //await connectToDatabase()
    await connectToDatabaseUnix()

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

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.replaceOne(
      { user: currentUsername },
      {
        user: newUsername,
        password: hashedPassword,
        device: device,
        activeSession: true,
      },
    )

    return {
      success: `The user "${currentUsername}" was successfully modified`,
      status: 200,
    }
  } catch (error) {
    return { error: error?.message || error, status: 500 }
  }
}

const setPersonalInfo = async (user, personalInfo) => {
  try {
    await connectToDatabaseUnix()
    const userResult = await getUser(user)
    if (userResult?.error) {
      return {
        error: `The user: "${user}". doesn't exist`,
        status: 404,
      }
    }
    await User.updateOne(
      { user: user },
      { $set: { personalInfo: personalInfo } },
    )
    return {
      success: `The personal info was successfully added to the user "${user}"`,
      status: 200,
    }
  } catch (error) {
    return { error: error?.message || error, status: 500 }
  }
}

const removePersonalInfo = async (user) => {
  try {
    await connectToDatabaseUnix()
    const userResult = await getUser(user)
    if (userResult?.error) {
      return {
        error: `The user: "${user}". doesn't exist`,
        status: 404,
      }
    }
    await User.updateOne({ user: user }, { $set: { personalInfo: {} } })
    return {
      success: `The personal info was successfully removed from the user "${user}"`,
      status: 200,
    }
  } catch (error) {
    return { error: error?.message || error, status: 500 }
  }
}

const getUserPersonalInfo = async (user) => {
  try {
    await connectToDatabaseUnix()
    const userResult = await getUser(user)
    if (userResult?.error) {
      return {
        error: `The user: "${user}". doesn't exist`,
        status: 404,
      }
    }

    const planUserPersonalInfo = JSON.parse(
      JSON.stringify(userResult?.user?.personalInfo),
    )
    return {
      personalInfo: planUserPersonalInfo,
      status: 200,
    }
  } catch (error) {
    return { error: error?.message || error, status: 500 }
  }
}

const updateUserPersonalInfo = async (user, personalInfo) => {
  try {
    await connectToDatabaseUnix()
    const userResult = await getUser(user)
    if (userResult?.error) {
      return {
        error: `The user: "${user}". doesn't exist`,
        status: 404,
      }
    }
    await User.updateOne(
      { user: user },
      { $set: { personalInfo: personalInfo } },
    )
    return {
      success: `The personal info was successfully updated for the user "${user}"`,
      status: 200,
    }
  } catch (error) {
    return { error: error?.message || error, status: 500 }
  }
}

export {
  getUsers,
  addUser,
  deleteUser,
  modifyUser,
  getUser,
  setPersonalInfo,
  removePersonalInfo,
  getUserPersonalInfo,
  updateUserPersonalInfo,
}
