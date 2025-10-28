"use client"

import MyButton from "../MyButton/MyButton"
import { useState } from "react"

export default function DropDown({ elements }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <MyButton onClick={() => setIsOpen(!isOpen)} text={"Dropdown"} />
      {isOpen && (
        <div className="flex justify-end">
          <ul className="flex bg-violet-700 shadow-md rounded-md mt-1 absolute flex-col">
            {elements.map((elem, index) => {
              return (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-violet-800 hover:rounded-md cursor-pointer"
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
