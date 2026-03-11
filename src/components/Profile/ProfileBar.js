"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const profileNavItems = [
  { label: "Profile", url: "/profile" },
  { label: "My Orders", url: "/profile/orders" },
]

export default function ProfileBar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-[90px] w-52 h-[calc(100vh-90px)] bg-violet-950 flex flex-col pt-6 gap-1 px-3">
      {profileNavItems.map(({ label, url }, index) => {
        const isActive = pathname === url
        return (
          <div key={url} className="flex flex-col">
            {index !== 0 && <hr className="border-violet-800 mb-1" />}
            <Link
              href={url}
              className={`flex items-center px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                isActive
                  ? "bg-violet-700 text-white"
                  : "text-violet-300 hover:bg-violet-900 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
