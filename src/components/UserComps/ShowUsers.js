"use client";
import { useState } from "react";
import Tabla from "../UserComps/Tabla";
import MyButton from "../Ui/MyButton";

export default function ShowUsers({ users }) {
  const [mostrarLista, setMostrarLista] = useState(false);

  return (
    <>
      <MyButton
        bText={
          mostrarLista ? (
            <span className="m-5">Hide users</span>
          ) : (
            <span className="m-5">Show users</span>
          )
        }
        bOnClick={() => setMostrarLista(!mostrarLista)}
      />

      {mostrarLista && (
        <div>
          <Tabla users={users?.usuarios} />
        </div>
      )}
    </>
  );
}
