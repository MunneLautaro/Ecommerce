export default function ItemProductCard({ type, elem, truncate = true }) {
  return (
    <p className={` text-yellow-500 w-[150px] ${truncate ? "truncate" : ""}`}>
      {type.toLowerCase() === "price" ? `$${elem || type}` : elem || type}
    </p>
  )
}
