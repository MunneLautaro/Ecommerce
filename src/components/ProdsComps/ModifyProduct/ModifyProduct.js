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
        className="grid grid-cols-1 lg:grid-cols-[1.6fr_minmax(340px,1fr)]"
        data-testid="ModProductComponent "
      >
        <div className="order-2 lg:order-1 flex flex-col items-start justify-start gap-4 min-w-0">
          <div className="flex flex-col-reverse items-end">
            <ShowProds />
            <Button
              text={<RefreshCcw />}
              onClick={() => dispatchProdFilter({ type: "RESET_FILTERS" })}
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 grid justify-start lg:justify-start lg:sticky lg:top-4">
          <ModifyProductForm onSubmit={fetchProductsWithPriceRange} />
        </div>
      </div>
    </>
  )
}
