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
      {itemFilter?.items ? (
        <table
          onDoubleClick={() =>
            setIsAdjusted((prevIsAdjusted) => !prevIsAdjusted)
          }
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
                    Type
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
            {itemFilter?.items.map((item, index) => (
              <tr
                key={item?.value}
                className={`h-[40px] cursor-pointer focus:ring-4 focus:ring-teal-300 items-center justify-center ${
                  index % 2 === 0
                    ? "bg-violet-400 text-white hover:bg-violet-600 transition-opacity"
                    : "bg-amber-400 text-white hover:bg-amber-600 transition-all duration-300"
                }`}
                tabIndex={0}
                role="button"
              >
                <td className="p-2 border border-[#212121]">{item?.type}</td>
                <td className="p-2 border border-[#212121]">
                  {<input placeholder={item?.value} />}
                </td>
                <td className="p-2 border border-[#212121]">{item?.prodId}</td>
                <td className="p-2 border border-[#212121]">
                  {item?.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>There's no items yet</h1>
      )}
    </>
  )
}
