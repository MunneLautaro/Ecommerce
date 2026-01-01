import ItemProductCard from "./ItemProductCard"

export default function Product({ product, truncate = true }) {
  return (
    <div className="flex flex-col items-center mt-[10px]">
      <div className="flex flex-col items-start">
        <ItemProductCard type={"SKU"} elem={product?.sku} truncate={truncate} />
        <ItemProductCard
          type={"Product"}
          elem={`${product?.product?.label || product?.product}`.toUpperCase()}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Description"}
          elem={product?.description}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Brand"}
          elem={`${product?.brand?.label || product?.brand}`.toUpperCase()}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Model"}
          elem={`${product?.model?.label || product?.model}`.toUpperCase()}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Color"}
          elem={`${product?.color?.label || product?.color}`.toUpperCase()}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Price"}
          elem={product?.price?.label ? product?.price?.label : product?.price}
          truncate={truncate}
        />
      </div>
    </div>
  )
}
