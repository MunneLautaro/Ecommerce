"use client"
import { useState } from "react"
import Pagination from "../Pagination/Pagination"

const USERS_PER_PAGE = 10

export default function Table({ users }) {
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
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3 text-right">MD5</th>
              <th className="px-6 py-3 text-right">SHA1</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white">
            {usersToShow.map((user) => (
              <tr key={user._id} className="hover:bg-violet-800">
                <td className="px-6 py-4 font-medium text-white">
                  {user.user}
                </td>
                <td
                  data-testid={`user-md5-${user._id}`}
                  className="px-6 py-4 text-right text-white"
                >
                  {user.md5}
                </td>
                <td
                  data-testid={`user-sha1-${user._id}`}
                  className="px-6 py-4 text-right text-white"
                >
                  {user.sha1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}
