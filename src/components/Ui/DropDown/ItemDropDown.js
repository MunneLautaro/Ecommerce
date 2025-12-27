"use client"

import MyButton from "../MyButton/MyButton"
import { useState, useContext } from "react"
import { ItemContext, ItemDispatchContext } from "@/contexts/ItemContext"
import useOutsideClick from "../../../hooks/dropdownHook"
import { ArrowDown, ArrowUp } from "react-feather"

export default function DropDown({ name }) {
  const [isOpen, setIsOpen] = useState(false)
  const itemFilter = useContext(ItemContext)
  const dispatchItemFilter = useContext(ItemDispatchContext)
  const ref = useOutsideClick(() => setIsOpen(false))

  let elements = [...new Set(itemFilter?.items?.map((item) => item?.[name]))]

  return (
    <div>
      <MyButton
        textColor="amber-400"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        text={<>{isOpen ? <ArrowUp /> : <ArrowDown />}</>}
        m={0}
      />
      {isOpen && (
        <div ref={ref} className="flex justify-end">
          <ul className="flex bg-violet-700 shadow-md rounded-md mt-1 absolute flex-col">
            {elements.map((elem, index) => {
              return (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-violet-800 hover:rounded-md cursor-pointer"
                  onClick={() => {
                    dispatchItemFilter({
                      type: "SET_FILTER",
                      payload: { attribute: name, value: elem },
                    })
                  }}
                >
                  {elem}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
