"use server"
import ProductFilter from "@/components/ProdsComps/ProductFiltrer/CardFormat/ProductFilter"
import { cookies } from "next/headers"
import { decrypt } from "../lib/session"
import { getProductsAction } from "@/actions/product"
import { getMostOrderedProducts } from "@/controllers/orders"

async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value || null
  const session = token ? await decrypt(token) : null
  return session
}

export default async function Productos() {
  const session = await getSession()
  const products = await getProductsAction({ next: { tags: ["products"] } })
  const mostOrderedProducts = await getMostOrderedProducts()

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <ProductFilter
          isAdmin={!!session?.isAdmin}
          products={products}
          mostOrderedProducts={mostOrderedProducts}
        />
      </div>
    </>
  )
}
