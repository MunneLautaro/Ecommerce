"use client"

import { useContext, useState } from "react"
import { ProductContext } from "../../../../contexts/ProductContext"
import DropDown from "@/components/Ui/DropDown/DropDown"
import OrderPriceButton from "@/components/Ui/MyButton/OrderPriceButton"
import { ProductFilterDispatchContext } from "@/contexts/ProductFilterContext"

export default function ProductTable({ products }) {
  const [formState, dispatchForm] = useContext(ProductContext)
  const [isAdjusted, setIsAdjusted] = useState(false)
  const [fieldToSort, setFieldToSort] = useState("product")
  const [isAscending, setIsAscending] = useState(true)
  const dispatch = useContext(ProductFilterDispatchContext)

  return (
    <>
      <table
        onDoubleClick={() => setIsAdjusted((prevIsAdjusted) => !prevIsAdjusted)}
        className={`table-${
          isAdjusted ? "adjusted" : "fixed"
        } border-collapse border border-[#212121] w-lg max-w-5xl`}
      >
        <thead className="bg-[#212121] text-amber-400">
          <tr>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("product")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Product
                </div>
                <div>
                  <DropDown
                    elements={products}
                    name={"product"}
                    callback={(elem) => {
                      dispatch({
                        type: "SET_FILTER",
                        payload: { attribute: "product", value: elem },
                      })
                    }}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("brand")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Brand
                </div>
                <div>
                  <DropDown
                    elements={products}
                    name={"brand"}
                    callback={(elem) => {
                      dispatch({
                        type: "SET_FILTER",
                        payload: { attribute: "brand", value: elem },
                      })
                    }}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("color")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Color
                </div>
                <div>
                  <DropDown
                    elements={products}
                    name={"color"}
                    callback={(elem) => {
                      dispatch({
                        type: "SET_FILTER",
                        payload: { attribute: "color", value: elem },
                      })
                    }}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("model")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Model
                </div>
                <div>
                  <DropDown
                    elements={products}
                    name={"model"}
                    callback={(elem) => {
                      dispatch({
                        type: "SET_FILTER",
                        payload: { attribute: "model", value: elem },
                      })
                    }}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div className="mr-2">Price</div>
                <div>
                  <OrderPriceButton />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products
            .sort((a, b) => {
              if (isAscending) {
                return a[fieldToSort].localeCompare(b[fieldToSort])
              }
              return b[fieldToSort].localeCompare(a[fieldToSort])
            })
            .map((prod, index) => (
              <tr
                key={prod?.sku}
                onClick={() => {
                  dispatchForm({ type: "SET_PRODUCT", payload: prod })
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    dispatchForm({ type: "SET_PRODUCT", payload: prod })
                  }
                }}
                className={`h-[40px] cursor-pointer focus:ring-4 focus:ring-teal-300 ${
                  index % 2 === 0
                    ? "bg-violet-400 text-white hover:bg-violet-600 transition-opacity"
                    : "bg-amber-400 text-white hover:bg-amber-600 transition-all duration-300"
                }`}
                tabIndex={0}
                role="button"
              >
                <td className="p-2 border border-[#212121]">{prod?.product}</td>
                <td className="p-2 border border-[#212121]">{prod?.brand}</td>
                <td className="p-2 border border-[#212121]">{prod?.color}</td>
                <td className="p-2 border border-[#212121]">{prod?.model}</td>
                <td className="truncate p-2 border border-[#212121]">
                  {`$${prod?.price}`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
