"use server";

import CryptoJS from "crypto-js";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { getUserData } from "../app/lib/getUserData";

export async function login(prevState, formData) {
  try {
    const user = formData.get("user");
    const password = formData.get("password");

    let cMD5 = CryptoJS.MD5(password).toString();
    let cSHA1 = CryptoJS.SHA1(password).toString();

    const currentUser = await getUserData(user);

    if (
      !currentUser ||
      currentUser.md5 !== cMD5 ||
      currentUser.sha1 !== cSHA1
    ) {
      console.log("error");
      return {
        errors: {
          email: ["invalid email or password"],
        },
      };
    }

    await createSession(currentUser._id);
  } catch (error) {
    console.log(error);
  }
  redirect("/prueba");
}

export async function logut() {
  await deleteSession();
  redirect("/login");
}
