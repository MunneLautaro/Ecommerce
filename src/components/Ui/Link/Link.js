import Link from "next/link"

export default function LinkUi({ url, href, children, id }) {
  return (
    <Link
      id={id}
      href={href || url}
      className="flex text-violet-400 items-center justify-center hover:underline text-xl font-bold"
    >
      {children}
    </Link>
  )
}
