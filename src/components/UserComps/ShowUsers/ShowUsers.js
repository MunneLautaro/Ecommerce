"use client"
import { useState } from "react"
import Table from "../Table/Table"
import Button from "../../Ui/Button/Button"

export default function ShowUsers({ users }) {
  const [mostrarLista, setMostrarLista] = useState(false)

  return (
    <>
      <Button
        text={
          mostrarLista ? (
            <span className="m-5">Hide users</span>
          ) : (
            <span className="m-5">Show users</span>
          )
        }
        onClick={() => setMostrarLista(!mostrarLista)}
      />

      {mostrarLista && (
        <div>
          <Table users={users} />
        </div>
      )}
    </>
  )
}
