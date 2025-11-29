"use client"

import { useContext, useState } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import DropDown from "@/components/Ui/DropDown/DropDown"

export default function ModDelCategorieItemTable() {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const [isAdjusted, setIsAdjusted] = useState(false)
  const [fieldToSort, setFieldToSort] = useState("type")
  const [isAscending, setIsAscending] = useState(true)

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
                    setFieldToSort("type")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Product
                </div>
                <div>
                  <DropDown name={"type"} />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("productname")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Product Name
                </div>
                <div>
                  <DropDown name={"productname"} />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("prodId")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Prod ID
                </div>
                <div>
                  <DropDown name={"prodId"} />
                </div>
              </div>
            </th>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    setFieldToSort("date")
                    setIsAscending((prevIsAscending) => !prevIsAscending)
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Date
                </div>
                <div>
                  <DropDown name={"date"} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {itemFilter.items
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
                  dispatchItemFilter({ type: "SET_PRODUCT", payload: prod })
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    dispatchItemFilter({ type: "SET_PRODUCT", payload: prod })
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
