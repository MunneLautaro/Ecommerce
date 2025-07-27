"use client"
import { useState, useEffect } from "react"
//import BotonesDeCarrito from "../Carrito/BotonesCarrito"
import Image from "next/image"
import ItemProductCard from "./ItemProductCard"

export default function ProductCard({ product, isCarrito, display }) {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [loading, setLoading] = useState(true)
  const [tiempoDeCarga, setTiempoDeCarga] = useState(
    randomIntFromInterval(500, 1500)
  )

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, tiempoDeCarga)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading ? (
        <div className="w-[250px] h-[300px] rounded-[15px] bg-[#151515] m-[3px] p-[5px] flex flex-col items-center animate-pulse">
          <div className="relative w-[75px] h-[75px] rounded-full bg-violet-900 mt-4" />
          <div className="text-white flex flex-col items-center mt-[10px] gap-2 w-full px-4">
            <div className="w-full h-4 bg-violet-700 rounded" />
            <div className="w-3/4 h-4 bg-violet-700 rounded" />
            <div className="w-5/6 h-4 bg-violet-700 rounded" />
            <div className="w-2/3 h-4 bg-violet-700 rounded" />
            <div className="w-4/5 h-4 bg-violet-700 rounded" />
            <div className="w-full h-4 bg-violet-700 rounded" />
            <div className="w-1/2 h-4 bg-violet-700 rounded" />
          </div>
        </div>
      ) : (
        <div className="w-[250px] h-[300px] rounded-[15px] bg-[#151515] m-[3px] p-[5px] flex flex-col items-center overflow-hidden">
          <div className="flex items-center justify-center relative w-[75px] h-[75px]">
            {product?.img && (
              <Image
                src={product.img}
                alt="Imagen de product"
                fill
                className="object-contain rounded-full"
                unoptimized
              />
            )}
          </div>
          <div className="flex flex-col items-center mt-[10px]">
            <ItemProductCard type={"SKU"} elem={product?.name} />
            <ItemProductCard type={"Name"} elem={product?.name} />
            <ItemProductCard type={"Description"} elem={product?.description} />
            <ItemProductCard type={"Brand"} elem={product?.brand} />
            <ItemProductCard type={"Model"} elem={product?.model} />
            <ItemProductCard type={"Color"} elem={product?.color} />
            <ItemProductCard type={"Price"} elem={product?.price} />
          </div>
        </div>
      )}
    </>
  )
}
