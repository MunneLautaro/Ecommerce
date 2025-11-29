"use client"

import Select from "@/components/ProdsComps/Select/Select"
import MyButton from "@/components/Ui/MyButton/MyButton"
import MyInput from "@/components/Ui/MyInput/MyInput"
import { VALID_CATEGORIES } from "@/utils/validCategories"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { addCategorieItemAction } from "../../../actions/categorieAction"

export default function AddCategorieItem() {
  const [item, setItem] = useState({ type: "", value: "" })
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!response) return
    if (response?.success) {
      toast.success(response?.success)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  return (
    <div className="flex">
      <form
        className="flex flex-col bg-[#424242] p-3 rounded-lg shadow-2xl border border-yellow-500 "
        onSubmit={async (e) => {
          e.preventDefault()
          const addItemResponse = await addCategorieItemAction(item)
          setResponse(addItemResponse)
          setItem({ type: "", value: "" })
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
        <MyInput
          type={"text"}
          placeHolder={`Enter ${item?.type}`}
          onChange={(e) => setItem({ ...item, value: e?.target?.value })}
          value={item?.value}
        />
        <MyButton type={"submit"} text={`Add ${item?.type} Item`} />
      </form>
    </div>
  )
}
