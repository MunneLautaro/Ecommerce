import { capitalizeText } from "@/helpers/capitalizeText"

export default function ItemProductCard({ type, elem, truncate = true }) {
  const capitalizedType = capitalizeText(type)

  return (
    <p className={` text-yellow-500 w-[150px] ${truncate ? "truncate" : ""}`}>
      {capitalizedType === "Price" ? `$${elem || type}` : elem || type}
    </p>
  )
}
