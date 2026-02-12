"use client"

import FilterByKey from "./FilterByKey"
import {
  ProductFilterContext,
  ProductFilterDispatchContext,
} from "@/contexts/ProductFilterContext"
import ShowProds from "../CardFormat/ShowProds"
import { useEffect, useContext, useState } from "react"
import FilterByPrice from "./FilterByPrice"
import { useFetchProducts } from "../../../../hooks/useFetchProducts"
import Carrousel from "../../../Ui/Carrousel/Carrousel"
import { Filter, X } from "react-feather"

export default function ProductFilter({ isAdmin = false, products }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [enableTransition, setEnableTransition] = useState(false)
  const prodFilter = useContext(ProductFilterContext)
  const dispatchProdFilter = useContext(ProductFilterDispatchContext)

  const { fetchProductsWithPriceRange } = useFetchProducts(dispatchProdFilter)

  useEffect(() => {
    fetchProductsWithPriceRange(products)
  }, [fetchProductsWithPriceRange, products])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(min-width: 1024px)")

    setEnableTransition(!mediaQuery.matches)

    const handleChange = (e) => {
      if (e.matches) {
        setIsFilterOpen(false)
        setEnableTransition(false)
      } else {
        setEnableTransition(true)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div className="flex flex-wrap justify-center items-center w-full">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden mt-5 fixed top-20 left-4 z-10 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-white shadow-lg transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        aria-label={isFilterOpen ? "Close filters" : "Open filters"}
      >
        {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
        <span className="text-sm font-medium">Filters</span>
      </button>

      <div
        className={`
          fixed lg:absolute top-0 lg:top-15 left-0 lg:left-auto right-0 lg:right-auto
          m-0 lg:m-5 p-4 lg:p-0
          bg-slate-900/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none
          z-[8] lg:z-auto
          ${enableTransition ? "transition-transform duration-300 ease-in-out" : ""}
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col lg:flex-row items-stretch lg:items-center justify-start lg:justify-center
          gap-3 lg:gap-0
          h-screen lg:h-auto
          overflow-y-auto lg:overflow-visible
          pt-20 lg:pt-0 
        `}
      >
        <div className="lg:hidden flex items-center justify-between my-15 px-2">
          <h2 className="text-xl font-semibold text-white">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-white hover:text-gray-300 transition mt-5"
            aria-label="Close filters"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-row my-15">
          <FilterByKey keys="brand" />
          <FilterByKey keys="model" />
          <FilterByKey keys="color" />
          <FilterByKey keys="product" />
          <FilterByPrice
            min={prodFilter?.prodFilter?.range?.min || 0}
            max={prodFilter?.prodFilter?.range?.max || 100}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[5]"
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="w-full flex items-center justify-center mt-45 ">
        <Carrousel />
      </div>

      <div className="flex flex-col">
        <ShowProds isAdmin={isAdmin} onSubmit={fetchProductsWithPriceRange} />
      </div>
    </div>
  )
}
