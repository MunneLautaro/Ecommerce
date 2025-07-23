import Link from "next/link"

export default function MyLink({ url, text, key }) {
  return (
    <Link key={key} href={url} className="text-violet-500 hover:underline">
      {text}
    </Link>
  )
}
