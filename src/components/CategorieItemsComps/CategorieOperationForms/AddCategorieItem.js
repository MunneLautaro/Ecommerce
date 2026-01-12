"use client"

import Select from "@/components/ProdsComps/Select/Select"
import Button from "@/components/Ui/Button/Button"
import Input from "../../Ui/Input/Input"
import { VALID_CATEGORIES } from "@/utils/validCategories"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { addCategorieItemAction } from "../../../actions/categorieAction"
import { set } from "mongoose"

export default function AddCategorieItem({ onSubmit }) {
  const [item, setItem] = useState({ type: "", value: "" })
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!response) return
    if (response?.success) {
      toast.success(`${response?.success}`)
      toast.info(`${response?.message}`)
    } else {
      toast.error(`${response?.error}`)
    }
    setResponse(null)
  }, [response])

  return (
    <div className="flex">
      <form
        className="flex flex-col bg-[#424242] p-3 rounded-lg shadow-2xl mt-2"
        onSubmit={async (e) => {
          e.preventDefault()
          const addItemResponse = await addCategorieItemAction(item)
          setResponse(addItemResponse)
          setItem({ type: "", value: "" })
          onSubmit()
        }}
      >
        <Select
          type={"Select your item type"}
          elements={VALID_CATEGORIES}
          onChange={(e) => {
            setItem({ ...item, type: e?.target?.value })
          }}
          value={item?.type}
        />
        <Input
          type={"text"}
          placeHolder={`Enter ${item?.type}`}
          onChange={(e) => setItem({ ...item, value: e?.target?.value })}
          value={item?.value}
        />
        <Button
          type={"submit"}
          text={`Add ${item?.type} Item`}
          disabled={item?.type === "" || item?.value === ""}
        />
      </form>
    </div>
  )
}
