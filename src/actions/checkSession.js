"use server"

import { getSession } from "@/lib/session"

export async function checkSession() {
  const session = await getSession()
  return !!session
}
