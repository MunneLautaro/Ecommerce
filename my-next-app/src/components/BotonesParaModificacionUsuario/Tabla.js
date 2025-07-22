"use client";

export default function Tabla({ users }) {
  return (
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
          {users.map((usuario) => (
            <tr key={usuario._id} className="hover:bg-violet-800">
              <td className="px-6 py-4 font-medium text-white">
                {usuario.user}
              </td>
              <td className="px-6 py-4 text-right text-white text-white">
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
  );
}
