import bcrypt from "bcryptjs"

const adminHash = bcrypt.hashSync("admin", 10)

export const users = [
  {
    user: "admin",
    password: adminHash,
    activeSession: true,
    isAdmin: true,
    device: "postman",
    lastSession: 0,
    __v: 0,
  },
  {
    user: "notAdmin",
    password: adminHash,
    activeSession: true,
    isAdmin: false,
    device: "postman",
    lastSession: 0,
    __v: 0,
  },
]
