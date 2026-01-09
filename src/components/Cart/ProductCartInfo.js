export default function ProductCartInfo({ product }) {
  return (
    <div className="flex flex-col ml-4 border-b-2 pb-2 bg-white text-black m-2 p-2 rounded-lg shadow-md min-w-[200px] max-w-[200px] min-h-[150px] max-h-[150px]">
      <h2 className="font-semibold">{product?.name}</h2>
      <p className="truncate">quantity: {product?.quantity}</p>
      <p className="truncate">unit price: ${product?.price}</p>
      <p className="truncate">
        subtotal: ${product?.price * product?.quantity}
      </p>
    </div>
  )
}
