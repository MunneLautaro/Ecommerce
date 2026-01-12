"use client"

import Button from "../Button/Button"
import { useState } from "react"
import useOutsideClick from "../../../hooks/useOnBlur"
import { ArrowDown, ArrowUp } from "react-feather"

export default function DropDown({
  elements,
  name,
  callback,
  selected = <ArrowUp />,
  unSelected = <ArrowDown />,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick(() => setIsOpen(false))

  let setOfElems = [
    ...new Set(
      elements?.map((elem) => {
        return name ? elem?.[name] : elem
      })
    ),
  ]

  return (
    <div className="z-3 relative">
      <Button
        textColor="amber-400"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        text={<>{isOpen ? selected : unSelected}</>}
        m={0}
      />
      {isOpen && (
        <div ref={ref} className="absolute right-0 mt-1 w-full">
          <ul className="custom-scrollbar flex bg-violet-700 shadow-md rounded-md mt-1 absolute flex-col overflow-y-auto max-h-60">
            {setOfElems.map((elem, index) => {
              return (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-violet-800 hover:rounded-md cursor-pointer"
                  onClick={(e) => {
                    callback(elem)
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
