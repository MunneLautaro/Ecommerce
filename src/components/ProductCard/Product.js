import ItemProductCard from "./ItemProductCard"
import { capitalizeText } from "@/helpers/capitalizeText"

export default function Product({ product, truncate = true }) {
  return (
    <div className="flex flex-col items-center mt-[10px]">
      <div className="flex flex-col items-start">
        <ItemProductCard type={"SKU"} elem={product?.sku} truncate={truncate} />
        <ItemProductCard
          type={"Product"}
          elem={`${capitalizeText(
            product?.product?.label || product?.product
          )}`}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Brand"}
          elem={`${capitalizeText(product?.brand?.label || product?.brand)}`}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Model"}
          elem={`${capitalizeText(product?.model?.label || product?.model)}`}
          truncate={truncate}
        />
        <ItemProductCard
          type={"Color"}
          elem={`${capitalizeText(product?.color?.label || product?.color)}`}
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
