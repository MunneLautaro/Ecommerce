const users = [
  { _id: 0, user: "lautaro", md5: "0", sha1: "0" },
  { _id: 1, user: "pame", md5: "1", sha1: "1" },
  { _id: 2, user: "boina", md5: "2", sha1: "2" },
  { _id: 3, user: "raul", md5: "3", sha1: "3" },
]

const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  _id: `user${i + 1}`,
  user: `User ${i + 1}`,
  md5: `md5-${i + 1}`,
  sha1: `sha1-${i + 1}`,
}))

export { users, mockUsers }
