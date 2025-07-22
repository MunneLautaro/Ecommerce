"use server";

import CryptoJS from "crypto-js";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { getUserData } from "../lib/getUserData";

export async function login(formData) {
  const user = formData.get("user");
  const password = formData.get("password");

  let cMD5 = CryptoJS.MD5(password).toString();
  let cSHA1 = CryptoJS.SHA1(password).toString();

  const currentUser = await getUserData(user);

  if (!user || !password) {
    return { errors: { login: "Complete all fields" } };
  }
  if (!currentUser || currentUser.md5 !== cMD5 || currentUser.sha1 !== cSHA1) {
    return { errors: { login: "Invalid credentials" } };
  }
  await createSession(currentUser._id);

  return { user: JSON.parse(JSON.stringify(currentUser)) };
}

export async function logut() {
  await deleteSession();
  redirect("/login");
}
