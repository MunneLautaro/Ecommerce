"use client"

import ModifyProductForm from "./ModifyProductForm"
import Button from "@/components/Ui/Button/Button"
import { useEffect, useContext } from "react"
import ShowProds from "../ProductFiltrer/TableFormat/TableShowProds"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "@/contexts/ProductFilterContext"
import { RefreshCcw } from "react-feather"
import { useFetchProducts } from "../../../hooks/useFetchProducts"

export default function ModifyProduct({ products }) {
  const stateProdFilter = useContext(ProductFilterContext)
  const dispatchProdFilter = useContext(ProductFilterDispatchContext)
  const { fetchProductsWithPriceRange } = useFetchProducts(dispatchProdFilter)

  useEffect(() => {
    fetchProductsWithPriceRange(products)
  }, [fetchProductsWithPriceRange, products])

  const isRefreshDisabled =
    !stateProdFilter?.prodFilter?.product &&
    !stateProdFilter?.prodFilter?.brand &&
    !stateProdFilter?.prodFilter?.model &&
    !stateProdFilter?.prodFilter?.color &&
    !stateProdFilter?.prodFilter?.price.min &&
    !stateProdFilter?.prodFilter?.price.max &&
    !stateProdFilter?.isAscending

  return (
    <>
      <h1 className="flex text-lg font-semibold mb-4">
        Modify an existent product!
      </h1>

      <div
        className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 xl:gap-6"
        data-testid="ModProductComponent "
      >
        <div className="order-2 xl:order-1 flex flex-col items-start justify-start gap-4 min-w-0">
          <div className="flex flex-col-reverse items-end">
            <ShowProds />
            <Button
              disabled={isRefreshDisabled}
              text={<RefreshCcw />}
              onClick={() => dispatchProdFilter({ type: "RESET_FILTERS" })}
            />
          </div>
        </div>

        <div className="order-1 xl:order-2 grid justify-center xl:justify-start xl:sticky xl:top-4 mb-6 xl:mb-0">
          <ModifyProductForm onSubmit={fetchProductsWithPriceRange} />
        </div>
      </div>
    </>
  )
}
