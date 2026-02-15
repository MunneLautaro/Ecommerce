"use client"
import { useContext, useState } from "react"
import ProductCard from "../../../ProductCard/ProductCard"
import { ProductFilterContext } from "../../../../contexts/ProductFilterContext"
import { applyFilter } from "@/helpers"
import Pagination from "@/components/UserComps/Pagination/Pagination"

const PRODUCTS_PER_PAGE = 12

export default function ShowProds({ isAdmin = false, onSubmit }) {
  const state = useContext(ProductFilterContext)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts =
    state?.products && state?.products.length > 0
      ? applyFilter(state?.products, state?.prodFilter)
      : []

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  )

  return (
    <>
      <div className="flex flex-wrap justify-center m-5">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((prod) => (
            <ProductCard
              display={true}
              key={prod?.sku}
              product={prod}
              isAdmin={isAdmin}
              onSubmit={onSubmit}
            />
          ))
        ) : (
          <h1>There is no products</h1>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
