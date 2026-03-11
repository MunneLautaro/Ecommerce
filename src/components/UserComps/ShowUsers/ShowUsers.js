"use client"
import Table from "../Table/Table"

export default function ShowUsers({ users }) {
  return (
    <>
      <div>
        <Table users={users} />
      </div>
    </>
  )
}
