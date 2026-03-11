import { useContext, useState } from "react"
import { ItemContext } from "../../../contexts/ItemContext"
import { ItemDispatchContext } from "../../../contexts/ItemContext"
import DatePicker from "../../DatePicker/DatePicker"
import DropDown from "../../Ui/DropDown/DropDown"
import { applyItemFilter } from "../../../helpers/applyFilter"
import { capitalizeText } from "@/helpers/capitalizeText"
import { Trash2, Edit } from "react-feather"
import {
  modifyCategorieAction,
  deleteCategorieItemAction,
} from "../../../actions/categorieAction"
import ConfirmActionButton from "../../Ui/Button/ConfirmActionButton"
import { useItemFilterActions } from "@/hooks/useItemFilterActions"
import SortableTh from "./SortableTh"
import TableData from "./TableData"
import Pagination from "../../UserComps/Pagination/Pagination"

const ITEMS_PER_PAGE = 10

export default function ItemTable({ resetTrigger, refreshButton }) {
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const [inputValues, setInputValues] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const {
    changeAscending,
    setFilter,
    setItem,
    handleDateChange,
    resetCurrentItem,
    setResponse,
    clearNewValue,
  } = useItemFilterActions(dispatchItemFilter)

  let items = applyItemFilter(itemFilter?.items, itemFilter?.itemFilter)

  const sortedItems = items.sort((a, b) => {
    if (itemFilter?.itemFilter?.isAscending) {
      return a[itemFilter?.itemFilter?.fieldToSort].localeCompare(
        b[itemFilter?.itemFilter?.fieldToSort],
      )
    }
    return b[itemFilter?.itemFilter?.fieldToSort].localeCompare(
      a[itemFilter?.itemFilter?.fieldToSort],
    )
  })

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = sortedItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  return (
    <>
      <table
        onDoubleClick={() =>
          setFilter("isAdjusted", !itemFilter.itemFilter.isAdjusted)
        }
        className={`table-${
          itemFilter.itemFilter.isAdjusted ? "adjusted" : "fixed"
        } border-collapse border border-[#212121] w-lg max-w-5xl`}
      >
        <thead className="bg-[#212121] text-amber-400">
          <tr>
            <SortableTh
              label="Type"
              sortField="type"
              onSort={(field) => {
                setFilter("fieldToSort", field)
                changeAscending()
              }}
            >
              <DropDown
                name={"type"}
                elements={itemFilter?.items}
                callback={(elem) => {
                  setFilter("type", elem)
                }}
              />
            </SortableTh>
            <SortableTh
              label={"Product Name"}
              sortField="value"
              onSort={(field) => {
                setFilter("fieldToSort", field)
                changeAscending()
              }}
            />
            <SortableTh
              label="Prod ID"
              sortField="prodId"
              onSort={(field) => {
                setFilter("fieldToSort", field)
                changeAscending()
              }}
            />
            <SortableTh
              label="Date"
              sortField="createdAt"
              onSort={(field) => {
                setFilter("fieldToSort", field)
                changeAscending()
              }}
            >
              <DatePicker
                callback={handleDateChange}
                resetTrigger={resetTrigger}
              />
            </SortableTh>
            <th className="p-2 border border-[#212121]">
              <div className="flex justify-center items-center">
                {refreshButton}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, index) => (
            <tr
              key={`${item?.type}-${item?.value}`}
              className={`h-[40px] cursor-pointer focus:ring-4 focus:ring-white items-center justify-center ${
                index % 2 === 0
                  ? "bg-violet-400 text-white hover:bg-violet-600 transition-opacity"
                  : "bg-amber-400 text-white hover:bg-amber-600 transition-all duration-300"
              }`}
              tabIndex={0}
              role="button"
              onClick={() => {
                setItem(item)
              }}
            >
              <TableData>
                {capitalizeText(
                  item?.type === "productname" ? "Product Name" : item?.type,
                )}
              </TableData>
              <TableData>
                <input
                  value={inputValues[item?.value] || ""}
                  placeholder={item?.value}
                  className="w-full bg-transparent focus:outline-none text-center placeholder:text-black placeholder:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    setItem(item)
                  }}
                  onChange={(e) => {
                    const newValue = e.target.value

                    setInputValues((prev) => ({
                      ...prev,
                      [item.value]: newValue,
                    }))
                  }}
                  aria-label={`Edit ${item?.type} value`}
                />
              </TableData>

              <TableData> {item?.prodId}</TableData>
              <TableData>{item?.createdAt}</TableData>
              <TableData>
                <ConfirmActionButton
                  buttonChildren={<Edit />}
                  modalTittle="Confirm edit"
                  modalMessage={`Accept to modify the item: ${
                    item.value
                  } to ${inputValues[item.value]}.`}
                  onCancel={() => {
                    resetCurrentItem()
                    clearNewValue()
                  }}
                  onConfirm={async () => {
                    const newValue = inputValues[item.value]

                    const modItemResponse = await modifyCategorieAction(
                      item.type,
                      item.value,
                      newValue,
                    )
                    setResponse(modItemResponse)

                    setInputValues((prev) => {
                      const copy = { ...prev }
                      delete copy[item.value]
                      return copy
                    })

                    resetCurrentItem()
                  }}
                  isDisabled={inputValues[item?.value] ? false : true}
                />
                <ConfirmActionButton
                  buttonChildren={<Trash2 />}
                  modalTittle="Confirm delete"
                  modalMessage={`Accept to delete the item: ${item.value}.`}
                  onConfirm={async () => {
                    const delItemResponse = await deleteCategorieItemAction(
                      item.type,
                      item.value,
                    )
                    setResponse(delItemResponse)

                    resetCurrentItem()
                  }}
                  isDisabled={
                    !itemFilter?.currentItem ||
                    itemFilter.currentItem.value !== item.value
                  }
                />
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center w-full">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  )
}
