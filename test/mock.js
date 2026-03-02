const users = [
  { _id: 0, user: "lautaro" },
  { _id: 1, user: "pame" },
  { _id: 2, user: "boina" },
  { _id: 3, user: "raul" },
]

const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  _id: `user${i + 1}`,
  user: `User ${i + 1}`,
}))

export { users, mockUsers }
