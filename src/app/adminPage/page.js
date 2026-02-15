"use server"
import AddUser from "../../components/UserComps/AddUser/AddUser"
import ShowUsers from "../../components/UserComps/ShowUsers/ShowUsers"
import ModUser from "../../components/UserComps/ModUser/ModUser"
import DeleteUser from "../../components/UserComps/DeleteUser/DeleteUser"
import { getUsersAction } from "@/actions/userAction"

export default async function Home() {
  const users = await getUsersAction()

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6">
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-4 w-full max-w-4xl">
        <AddUser />
        <DeleteUser />
        <ModUser />
      </div>
      <ShowUsers users={users?.users} />
    </div>
  )
}
