"use client"

import Select from "@/components/ProdsComps/Select/Select"
import MyButton from "@/components/Ui/MyButton/MyButton"
import MyInput from "@/components/Ui/MyInput/MyInput"
import { VALID_CATEGORIES } from "@/utils/validCategories"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { modifyCategorieAction } from "../../../actions/categorieAction"

export default function ModifyCategorieItem() {
  const [item, setItem] = useState({ type: "", oldValue: "", newValue: "" })
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
    <div>
      <form
        className="flex flex-col bg-[#424242] p-3 rounded-lg shadow-2xl border border-yellow-500 "
        onSubmit={async (e) => {
          e.preventDefault()
          const modItemResponse = await modifyCategorieAction(item)
          setResponse(modItemResponse)
          setItem({ type: "", oldValue: "", newValue: "" })
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
          placeHolder={`Enter old ${item?.type}`}
          onChange={(e) => setItem({ ...item, oldValue: e?.target?.value })}
          value={item?.oldValue}
        />

        <MyInput
          type={"text"}
          placeHolder={`Enter new ${item?.type}`}
          onChange={(e) => setItem({ ...item, newValue: e?.target?.value })}
          value={item?.newValue}
        />
        <MyButton type={"submit"} text={`Modify ${item?.type} Item`} />
      </form>
    </div>
  )
}
