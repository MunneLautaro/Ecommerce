"use server"
import AddUser from "../../components/UserComps/AddUser/AddUser"
import ShowUsers from "../../components/UserComps/ShowUsers/ShowUsers"
import ModUser from "../../components/UserComps/ModUser/ModUser"
import DeleteUser from "../../components/UserComps/DeleteUser/DeleteUser"

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_FULL_URL}/api/users`, {
    next: { tags: ["users"] },
  })

  const users = await res.json()

  return (
    <>
      <div className="flex flex-col items-center justify-center grid-cols-2 gap-5 mt-5">
        <div className="flex flex-row items-end justify-center gap-5">
          <div>
            <AddUser />
          </div>
          <div>
            <DeleteUser />
          </div>
          <div>
            <ModUser />
          </div>
        </div>
        <ShowUsers users={users?.users} />
      </div>
    </>
  )
}
