"use client"
import ProductCard from "../../ProductCard/ProductCard"

export default function ShowProds({ prods }) {
  console.log({ prods })
  return (
    <>
      <div className="flex flex-wrap justify-center m-5">
        {prods && prods.length > 0 ? (
          prods.map((prod) => (
            <ProductCard display={true} key={prod.sku} product={prod} />
          ))
        ) : (
          <h1>There is no products</h1>
        )}
      </div>
    </>
  )
}
