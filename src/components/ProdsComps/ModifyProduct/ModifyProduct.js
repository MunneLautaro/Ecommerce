"use client"

import ModifyProductForm from "./ModifyProductForm"
import Button from "@/components/Ui/Button/Button"
import { useEffect, useContext } from "react"
import ShowProds from "../ProductFiltrer/TableFormat/TableShowProds"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"
import { RefreshCcw } from "react-feather"
import { useFetchProducts } from "../../../hooks/useFetchProducts"

export default function ModifyProduct() {
  const dispatchProdFilter = useContext(ProductFilterDispatchContext)
  const { fetchProductsWithPriceRange } = useFetchProducts(
    null,
    dispatchProdFilter
  )

  useEffect(() => {
    fetchProductsWithPriceRange()
  }, [fetchProductsWithPriceRange])

  return (
    <>
      <h1 className="flex text-lg font-semibold mb-4">
        Modify an existent product!
      </h1>

      <div
        className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2"
        data-testid="ModProductComponent "
      >
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col-reverse items-end">
            <ShowProds />
            <Button
              text={<RefreshCcw />}
              onClick={() => dispatchProdFilter({ type: "RESET_FILTERS" })}
            />
          </div>
        </div>

        <div className="grid grid-flow-col justify-center gap-4">
          <ModifyProductForm onSubmit={fetchProductsWithPriceRange} />
        </div>
      </div>
    </>
  )
}
