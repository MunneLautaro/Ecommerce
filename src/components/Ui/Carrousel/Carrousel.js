"use client"
import { ArrowRight, ArrowLeft } from "react-feather"
import { useState, useEffect } from "react"
import CarrouselProductCard from "./CarrouselProductCard"

export default function Carrousel({ mostOrderedProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const items = Array.isArray(mostOrderedProducts) ? mostOrderedProducts : []
  const hasItems = items.length > 0
  const isLoading = false

  const handlePrev = () => {
    setSelectedProduct((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedProduct((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    setSelectedProduct((prev) => {
      if (!hasItems) return 0
      return Math.min(prev, items.length - 1)
    })
  }, [items.length, hasItems])

  useEffect(() => {
    if (items.length <= 1) return

    const intervalId = setInterval(() => {
      setSelectedProduct((prev) => (prev === items.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(intervalId)
  }, [items.length])

  const currentProduct = hasItems ? items[selectedProduct] : null

  return (
    <div className="flex w-full justify-center px-2 sm:px-4">
      <div className="relative flex h-auto w-full max-w-4xl flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900 px-3 sm:px-6 py-5 sm:py-6 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-violet-500 blur-3xl" />
          <div className="absolute right-0 bottom-[-30px] h-52 w-52 rounded-full bg-indigo-500 blur-3xl" />
        </div>

        <button
          aria-label="Producto anterior"
          className="group absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-5 grid h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg transition hover:-translate-x-1 hover:bg-white/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white/60"
          onClick={handlePrev}
        >
          <ArrowLeft
            size={18}
            className="sm:w-6 sm:h-6 transition group-hover:-translate-x-0.5"
          />
        </button>

        <div className="relative flex items-center justify-center gap-4 px-10 sm:px-16">
          <div className="relative flex-1">
            <div
              className="transition-all duration-500 ease-out"
              key={currentProduct?.sku ?? selectedProduct}
            >
              <CarrouselProductCard
                product={currentProduct}
                isPlaceholder={!hasItems}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <button
          aria-label="Producto siguiente"
          className="group absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-5 grid h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg transition hover:translate-x-1 hover:bg-white/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white/60"
          onClick={handleNext}
        >
          <ArrowRight
            size={18}
            className="sm:w-6 sm:h-6 transition group-hover:translate-x-0.5"
          />
        </button>

        <div className="relative mt-4 sm:mt-8 flex justify-center gap-2">
          {(hasItems ? items : [null]).map((_, id) => {
            const isActive = hasItems ? selectedProduct === id : false
            return (
              <button
                key={id}
                aria-label={
                  hasItems ? `Ver producto ${id + 1}` : "Sin productos"
                }
                className={`h-3 w-8 rounded-full transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
                  isActive
                    ? "bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.25)]"
                    : "bg-white/30"
                } ${hasItems ? "hover:bg-white/50" : "opacity-40"}`}
                disabled={!hasItems}
                onClick={() => hasItems && setSelectedProduct(id)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
