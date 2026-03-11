"use client"
import { useState } from "react"
import AddUser from "../AddUser/AddUser"
import ModUser from "../ModUser/ModUser"
import DeleteUser from "../DeleteUser/DeleteUser"
import ShowUsers from "../ShowUsers/ShowUsers"
import Caption from "@/components/Ui/Caption/Caption"

export default function UserFormTabs({ users }) {
  const [activeTab, setActiveTab] = useState(0)

  const TABS = [
    { label: "Add User", component: <AddUser /> },
    { label: "Modify User", component: <ModUser /> },
    { label: "Delete User", component: <DeleteUser /> },
    { label: "Show Users", component: <ShowUsers users={users} /> },
  ]

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <div className="flex w-full">
        {TABS.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
              activeTab === index
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Caption customStyle={"text-2xl font-bold text-center mt-6"}>
        Admin Panel
      </Caption>
      <div className="w-full mt-4 flex justify-center">
        {TABS[activeTab].component}
      </div>
    </div>
  )
}
