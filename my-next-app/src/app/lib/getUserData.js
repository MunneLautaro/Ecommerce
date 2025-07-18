import { connectWithSSH } from "@/dbMongo";
import User from "@/models/userModel";

export async function getUserData(user) {
  await connectWithSSH();
  return await User.findOne({ user });
}
