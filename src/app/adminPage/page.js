"use server"
import UserFormTabs from "../../components/UserComps/UserFormTabs/UserFormTabs"
import { getUsersAction } from "@/actions/userAction"

export default async function Home() {
  const users = await getUsersAction()

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-6">
      <UserFormTabs users={users?.users} />
    </div>
  )
}
