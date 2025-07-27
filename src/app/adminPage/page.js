"use server"
import AddUser from "../../components/UserComps/AddUser"
import ShowUsers from "../../components/UserComps/ShowUsers"
import ModUser from "../../components/UserComps/ModUser"
import DeleteUser from "../../components/UserComps/DeleteUser"

export default async function Home() {
  const res = await fetch(/*@#1*/ "http://localhost:3000/api/userController", {
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
        <ShowUsers users={users} />
      </div>
    </>
  )
}
