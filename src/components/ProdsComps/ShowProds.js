"use client"
import ProductCard from "../ProductCard/ProductCard"

export default function ShowProds({ prods }) {
  return (
    <>
      <div className="flex flex-wrap justify-center m-5">
        {prods?.products && prods?.products.length > 0 ? (
          prods?.products.map((prod) => (
            <ProductCard display={true} key={prod.sku} product={prod} />
          ))
        ) : (
          <h1>There is no products</h1>
        )}
      </div>
    </>
  )
}
