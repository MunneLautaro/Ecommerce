"use client"
import { useContext } from "react"
import { ProductFilterContext } from "../../../../contexts/ProductFilterContext"
import { applyFilter } from "@/helpers"
import MyButton from "@/components/Ui/MyButton/MyButton"

export default function ShowProds() {
  const state = useContext(ProductFilterContext)
  console.log({ state })

  return (
    <>
      {state?.loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap justify-center m-5">
          {state?.products && state?.products.length > 0 ? (
            applyFilter(state?.products, state?.prodFilter).map((prod) => (
              <>
                {console.log({ state })}
                <MyButton
                  key={prod?.sku}
                  text={`${prod?.product}, ${prod?.brand}, ${prod?.model}, ${prod?.color}, ${prod?.price}`}
                />
              </>
            ))
          ) : (
            <h1>There is no products</h1>
          )}
        </div>
      )}
    </>
  )
}
