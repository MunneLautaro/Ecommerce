"use server"
import ShowProds from "../../components/ProdsComps/ShowProds"
const prodsDB = await import("../api/prodController/route")

export async function getProds() {
  const products = await (await prodsDB.GET()).json()
  return products
}

export default async function Productos() {
  const prods = await getProds()

  return (
    <>
      <div className="flex items-center justify-center">
        <ShowProds prods={prods} />
      </div>
    </>
  )
}
