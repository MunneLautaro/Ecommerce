"use server"
import ProductFilter from "@/components/ProdsComps/ProductFiltrer/CardFormat/ProductFilter"
import { cookies } from "next/headers"
import { decrypt } from "../lib/session"

export default async function Productos() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value || null
  const session = token ? await decrypt(token) : null
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <ProductFilter isAdmin={!!session?.isAdmin} />
      </div>
    </>
  )
}
