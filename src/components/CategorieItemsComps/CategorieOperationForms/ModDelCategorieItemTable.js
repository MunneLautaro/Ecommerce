"use client"

import { useContext, useState } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import { RefreshCcw } from "react-feather"
import { applyItemFilter } from "@/helpers/applyFilter"
import DropDown from "@/components/Ui/DropDown/DropDown"
import DatePicker from "@/components/DatePicker/DatePicker"

const INITIAL_FIELD_TO_SORT = "type"

export default function ModDelCategorieItemTable() {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const [isAdjusted, setIsAdjusted] = useState(false)
  const [fieldToSort, setFieldToSort] = useState("type")
  const [isAscending, setIsAscending] = useState(true)
  const [inputValues, setInputValues] = useState({})

  const resetFilters = () => {
    setFieldToSort(INITIAL_FIELD_TO_SORT)
    setIsAscending(true)
  }

  let items = applyItemFilter(itemFilter?.items, itemFilter?.itemFilter)

  const isRefreshDisabled =
    fieldToSort === INITIAL_FIELD_TO_SORT &&
    isAscending &&
    itemFilter?.itemFilter?.type === ""

  console.log({
    fieldToSort,
    isAscending,
    type: itemFilter?.itemFilter?.type,
    isRefreshDisabled,
  })

  return (
    <>
      {items ? (
        <>
          <div className="flex flex-row items-start justify-end mb-4">
            <button
              onClick={() => {
                resetFilters()
                dispatchItemFilter({ type: "RESET_FILTERS" })
              }}
              disabled={isRefreshDisabled}
              className={`flex mt-5 items-center m-5 disabled:opacity-50 ${
                isRefreshDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <RefreshCcw />
            </button>
          </div>
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
                      <DropDown
                        name={"type"}
                        elements={itemFilter?.items}
                        callback={(elem) => {
                          dispatchItemFilter({
                            type: "SET_FILTER",
                            payload: { attribute: "type", value: elem },
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
                        setFieldToSort("value")
                        setIsAscending((prevIsAscending) => !prevIsAscending)
                      }}
                      className="mr-2 hover:underline cursor-pointer"
                    >
                      Product Name
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
                  </div>
                </th>
                <th className="p-2 border border-[#212121]">
                  <div className="flex flex-row justify-center items-center">
                    <div
                      onClick={() => {
                        setFieldToSort("updatedAt")
                        setIsAscending((prevIsAscending) => !prevIsAscending)
                      }}
                      className="mr-2 hover:underline cursor-pointer"
                    >
                      Date
                    </div>
                    <div className="hover:bg-violet-600 rounded-full p-2 transition-all duration-300">
                      <DatePicker />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                .sort((a, b) => {
                  if (isAscending) {
                    return a[fieldToSort].localeCompare(b[fieldToSort])
                  }
                  return b[fieldToSort].localeCompare(a[fieldToSort])
                })

                .map((item, index) => (
                  <tr
                    key={item?.value}
                    className={`h-[40px] cursor-pointer focus:ring-4 focus:ring-teal-300 items-center justify-center ${
                      index % 2 === 0
                        ? "bg-violet-400 text-white hover:bg-violet-600 transition-opacity"
                        : "bg-amber-400 text-white hover:bg-amber-600 transition-all duration-300"
                    }`}
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      dispatchItemFilter({ type: "SET_ITEM", payload: item })
                      console.log({ itemFilter })
                    }}
                  >
                    <td className="p-2 border border-[#212121]">
                      {item?.type}
                    </td>
                    <td className="p-2 border border-[#212121]">
                      <input
                        value={inputValues[item?.value] || ""}
                        placeholder={item?.value}
                        className="w-full bg-transparent focus:outline-none text-center"
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatchItemFilter({
                            type: "SET_ITEM",
                            payload: item,
                          })
                        }}
                        onChange={(e) => {
                          setInputValues((prev) => ({
                            ...prev,
                            [item?.value]: e.target.value,
                          }))
                          dispatchItemFilter({
                            type: "SET_NEW_VALUE",
                            payload: e.target.value,
                          })
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            setInputValues((prev) => {
                              const newValues = { ...prev }
                              delete newValues[item?.value]
                              return newValues
                            })
                            dispatchItemFilter({
                              type: "CLEAR_NEW_VALUE",
                            })
                          }, 150)
                        }}
                      />
                    </td>
                    <td className="p-2 border border-[#212121]">
                      {item?.prodId}
                    </td>
                    <td className="p-2 border border-[#212121]">
                      {item?.createdAt}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>Theres no items yet</h1>
      )}
    </>
  )
}
