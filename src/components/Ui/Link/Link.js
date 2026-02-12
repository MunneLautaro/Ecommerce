import Link from "next/link"

export default function LinkUi({ url, href, children, id }) {
  return (
    <Link
      id={id}
      href={href || url}
      className="text-violet-400 hover:underline mr-10 text-xl font-bold"
    >
      {children}
    </Link>
  )
}
