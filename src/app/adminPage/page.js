"use server"
import AddUser from "../../components/UserComps/AddUser/AddUser"
import ShowUsers from "../../components/UserComps/ShowUsers/ShowUsers"
import ModUser from "../../components/UserComps/ModUser/ModUser"
import DeleteUser from "../../components/UserComps/DeleteUser/DeleteUser"
import { getUsersAction } from "@/actions/userAction"
import Caption from "@/components/Ui/Caption/Caption"

export default async function Home() {
  const users = await getUsersAction()

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6">
      <Caption customStyle={"text-2xl font-bold text-center mb-6"}>
        Admin Panel
      </Caption>
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-4 w-full max-w-4xl">
        <AddUser />
        <DeleteUser />
        <ModUser />
      </div>
      <ShowUsers users={users?.users} />
    </div>
  )
}
