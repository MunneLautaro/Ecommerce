"use server";

import { actionUser } from "./serverActionUser";

export async function modUser(formData) {
  const user = formData.get("user");
  const newUser = formData.get("newUser");
  const newPassword = formData.get("newPassword");

  const res = await fetch("http://localhost:3000/api/userController", {
    method: "PUT",
    body: JSON.stringify({
      anteriorUser: user,
      nuevoUser: newUser,
      nuevaPass: newPassword,
    }),
    headers: { "Content-Type": "application/json" },
  });
  actionUser();

  let body = await res.json();
  return body;
}
