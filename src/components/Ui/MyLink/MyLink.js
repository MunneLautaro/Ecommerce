import Link from "next/link"

export default function MyLink({ url, text, id }) {
  return (
    <Link
      id={id}
      href={url}
      className="text-violet-400 hover:underline mr-10 text-xl font-bold"
    >
      {text}
    </Link>
  )
}
