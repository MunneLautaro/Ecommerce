"use server"

import DisplayCategorieOperation from "../../components/CategorieItemsComps/DisplayCategorieOperation"
import { getCategorieItemsAction } from "@/actions/categorieAction"

export default async function CategorieItems() {
  const items = await getCategorieItemsAction({ next: { tags: ["items"] } })

  return (
    <div>
      <DisplayCategorieOperation items={items?.data} />
    </div>
  )
}
