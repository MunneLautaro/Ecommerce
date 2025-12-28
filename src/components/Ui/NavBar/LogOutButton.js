import { logout } from "../../../actions/index"

export default function LogOutButton({ username, isAdmin }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2
        className={`${
          isAdmin ? "text-violet-400" : "text-yellow-500"
        } font-black font-mono text-3xl `}
      >
        {username}
      </h2>
      <button
        className="bg-gray-300 hover:bg-gray-600 text-gray-900 p-1 rounded"
        onClick={logout}
      >
        LOGOUT
      </button>
    </div>
  )
}
