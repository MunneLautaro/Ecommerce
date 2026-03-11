"use client"

import Select from "@/components/ProdsComps/Select/Select"
import Button from "@/components/Ui/Button/Button"
import Input from "../../Ui/Input/Input"
import { VALID_CATEGORIES } from "@/utils/validCategories"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { addCategorieItemAction } from "../../../actions/categorieAction"
import Label from "@/components/Ui/Label/Label"
import Caption from "@/components/Ui/Caption/Caption"

export default function AddCategorieItem() {
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
    <div className="flex flex-col items-center w-full">
      <Caption customStyle={"text-xl font-bold text-center my-4 w-full"}>
        Add Categorie Item
      </Caption>
      <form
        className="flex flex-col bg-[#424242] p-3 rounded-lg shadow-2xl mt-2 border border-bg-[#d3d3d3]"
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

        <Label htmlFor="itemValue">Item Value</Label>
        <Input
          id="itemValue"
          type={"text"}
          placeHolder={`Enter ${item?.type || "value"} `}
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
