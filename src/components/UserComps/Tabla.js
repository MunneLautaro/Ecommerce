"use client"

import { useState } from "react"
import MyButton from "../Ui/MyButton"

const USERS_PER_PAGE = 10

export default function Tabla({ users }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE)

  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const endIndex = startIndex + USERS_PER_PAGE
  const usersToShow = users.slice(startIndex, endIndex)

  return (
    <div>
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-[#424242] text-left text-sm text-gray-900">
          <thead className="bg-[#424242] text-white uppercase text-xs border-b border-white">
            <tr>
              <th className="px-6 py-3">Usuario</th>
              <th className="px-6 py-3 text-right">MD5</th>
              <th className="px-6 py-3 text-right">SHA1</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white">
            {usersToShow.map((usuario) => (
              <tr key={usuario._id} className="hover:bg-violet-800">
                <td className="px-6 py-4 font-medium text-white">
                  {usuario.user}
                </td>
                <td className="px-6 py-4 text-right text-white">
                  {usuario.md5}
                </td>
                <td className="px-6 py-4 text-right text-white">
                  {usuario.sha1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <MyButton
          bDisabled={currentPage === 1}
          bOnClick={() => setCurrentPage((p) => p - 1)}
          bText={"Previous"}
        />
        <span className="text-white m-1 mt-2">
          Page {currentPage} of {totalPages}
        </span>

        <MyButton
          bDisabled={currentPage === totalPages}
          bOnClick={() => setCurrentPage((p) => p + 1)}
          bText={"next"}
        />
      </div>
    </div>
  )
}
