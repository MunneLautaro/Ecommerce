import { useContext, useState, useCallback } from "react"
import { ItemContext } from "../../../contexts/ItemContext"
import { ItemDispatchContext } from "../../../contexts/ItemContext"
import DatePicker from "../../DatePicker/DatePicker"
import DropDown from "../../Ui/DropDown/DropDown"
import { applyItemFilter } from "../../../helpers/applyFilter"

export default function ItemTable({ resetTrigger }) {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const [inputValues, setInputValues] = useState({})

  const handleDateChange = useCallback(
    (date) =>
      dispatchItemFilter({
        type: "SET_FILTER_DATE",
        payload: date,
      }),
    [dispatchItemFilter]
  )

  let items = applyItemFilter(itemFilter?.items, itemFilter?.itemFilter)
  return (
    <>
      <table
        onDoubleClick={() =>
          dispatchItemFilter({
            type: "SET_FILTER",
            payload: {
              attribute: "isAdjusted",
              value: !itemFilter.itemFilter.isAdjusted,
            },
          })
        }
        className={`table-${
          itemFilter.itemFilter.isAdjusted ? "adjusted" : "fixed"
        } border-collapse border border-[#212121] w-lg max-w-5xl`}
      >
        <thead className="bg-[#212121] text-amber-400">
          <tr>
            <th className="p-2 border border-[#212121]">
              <div className="flex flex-row justify-center items-center">
                <div
                  onClick={() => {
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: { attribute: "fieldToSort", value: "type" },
                    })
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: {
                        attribute: "isAscending",
                        value: !itemFilter.itemFilter.isAscending,
                      },
                    })
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
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: { attribute: "fieldToSort", value: "value" },
                    })
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: {
                        attribute: "isAscending",
                        value: !itemFilter.itemFilter.isAscending,
                      },
                    })
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
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: {
                        attribute: "fieldToSort",
                        value: "prodId",
                      },
                    })
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: {
                        attribute: "isAscending",
                        value: !itemFilter.itemFilter.isAscending,
                      },
                    })
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
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: {
                        attribute: "fieldToSort",
                        value: "createdAt",
                      },
                    })
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: {
                        attribute: "isAscending",
                        value: !itemFilter.itemFilter.isAscending,
                      },
                    })
                  }}
                  className="mr-2 hover:underline cursor-pointer"
                >
                  Date
                </div>
                <div className="hover:bg-violet-600 rounded-full p-2 transition-all duration-300">
                  <DatePicker
                    callback={handleDateChange}
                    resetTrigger={resetTrigger}
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {items
            .sort((a, b) => {
              if (itemFilter?.itemFilter?.isAscending) {
                return a[itemFilter?.itemFilter?.fieldToSort].localeCompare(
                  b[itemFilter?.itemFilter?.fieldToSort]
                )
              }
              return b[itemFilter?.itemFilter?.fieldToSort].localeCompare(
                a[itemFilter?.itemFilter?.fieldToSort]
              )
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
                }}
              >
                <td className="p-2 border border-[#212121]">{item?.type}</td>
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
                <td className="p-2 border border-[#212121]">{item?.prodId}</td>
                <td className="p-2 border border-[#212121]">
                  {item?.createdAt}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
