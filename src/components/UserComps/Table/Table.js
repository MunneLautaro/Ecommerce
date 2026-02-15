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
    <div className="w-full max-w-full px-2 sm:px-0">
      <div className="overflow-x-auto rounded-xl shadow-md border border-white/10">
        <table className="w-full bg-[#2a2a2a] text-left text-sm text-gray-900">
          <thead className="bg-[#333] text-white uppercase text-xs border-b border-white/20">
            <tr>
              <th className="px-3 sm:px-6 py-3">User</th>
              <th className="px-3 sm:px-6 py-3 text-right hidden sm:table-cell">
                MD5
              </th>
              <th className="px-3 sm:px-6 py-3 text-right hidden sm:table-cell">
                SHA1
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {usersToShow.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-violet-800/40 transition-colors"
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-white">
                  <div>{user.user}</div>
                  <div className="sm:hidden mt-1 space-y-1 text-xs text-gray-400">
                    <div className="truncate">
                      <span className="text-gray-500">MD5: </span>
                      <span data-testid={`user-md5-${user._id}`}>
                        {user.md5}
                      </span>
                    </div>
                    <div className="truncate">
                      <span className="text-gray-500">SHA1: </span>
                      <span data-testid={`user-sha1-${user._id}`}>
                        {user.sha1}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  data-testid={`user-md5-${user._id}`}
                  className="px-3 sm:px-6 py-3 sm:py-4 text-right text-white hidden sm:table-cell"
                >
                  <span className="inline-block max-w-[180px] lg:max-w-none truncate lg:overflow-visible">
                    {user.md5}
                  </span>
                </td>
                <td
                  data-testid={`user-sha1-${user._id}`}
                  className="px-3 sm:px-6 py-3 sm:py-4 text-right text-white hidden sm:table-cell"
                >
                  <span className="inline-block max-w-[200px] lg:max-w-none truncate lg:overflow-visible">
                    {user.sha1}
                  </span>
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
