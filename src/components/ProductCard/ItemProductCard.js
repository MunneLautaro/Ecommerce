export default function ItemProductCard({ type, elem }) {
  return <p className="text-yellow-500"> {elem ? elem : type}</p>
}
