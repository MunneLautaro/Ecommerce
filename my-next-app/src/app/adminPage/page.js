"use server";
import AddUser from "../../components/BotonesParaModificacionUsuario/AddUser";
import ShowUsers from "../../components/BotonesParaModificacionUsuario/ShowUsers";
import ModUser from "../../components/BotonesParaModificacionUsuario/ModUser";
import DeleteUser from "../../components/BotonesParaModificacionUsuario/DeleteUser";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/userController", {
    next: { tags: ["users"] },
  });
  const users = await res.json();

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
  );
}

/*




"use server";
import AddUser from "../../components/BotonesParaModificacionUsuario/AddUser";
//import ShowUsers from "";
//import ModUser from "@/componente/BotonesParaModificacionUsuario/ModUser";
//import DeleteUser from "@/componente/BotonesParaModificacionUsuario/DeleteUser";
import { ToastContainer } from "react-toastify";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/userController", {
    next: { tags: ["users"] },
  });
  const users = await res.json();

  return (
    <>
      <div className="flex flex-col items-center justify-center grid-cols-2 gap-5">
        <div className="flex flex-row items-end justify-center gap-5">
          <div>
            <AddUser />
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
    </>
  );
}
/*
<div>
            <DeleteUser />
          </div>

          <div>
            <ModUser />
          </div>
          <ShowUsers users={users} />
          */
