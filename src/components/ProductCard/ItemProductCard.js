export default function ItemProductCard({ type, elem }) {
  return (
    <p className="text-yellow-500">
      {type.toLowerCase() === "price" ? `$${elem || type}` : elem || type}
    </p>
  )
}
