"use server"
import AddProduct from "../../components/ProdsComps/AddProduct/AddProduct"

export default async function AddProds() {
  return (
    <div className="flex justify-center mb-5 items-start">
      <AddProduct />
    </div>
  )
}
