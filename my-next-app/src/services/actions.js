"use server";

import { createSession, deleteSession } from "@/app/lib/session";
import { email, z } from "zod";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "sarlanga3333332@prueba.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.email({ message: "invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});
export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: z.treeifyError(result.error) };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/prueba");
}

export async function logut() {
  await deleteSession();
  redirect("/login");
}
