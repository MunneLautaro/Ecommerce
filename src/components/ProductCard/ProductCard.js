"use client"
import { useState, useEffect } from "react"
import { deleteProductAction } from "@/actions/product"
import { toast } from "react-toastify"
import { Trash } from "react-feather"
import Image from "next/image"
import ItemProductCard from "./ItemProductCard"
import Button from "../Ui/Button/Button"
import ConfirmActionButton from "../Ui/Button/ConfirmActionButton"

export default function ProductCard({
  product,
  isCarrito,
  display,
  isAdmin,
  onSubmit,
}) {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tiempoDeCarga, setTiempoDeCarga] = useState(
    randomIntFromInterval(500, 1500)
  )

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, tiempoDeCarga)
  }, [])

  useEffect(() => {
    if (!response) return
    if (response?.success) {
      toast.success(response?.success)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  const handleDelete = async () => {
    const deletedProduct = await deleteProductAction(product?.sku)
    setResponse(deletedProduct)
    onSubmit()
  }

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
        <div className="w-[250px] h-[300px] rounded-[15px] bg-[#151515] m-[3px] p-[5px] flex flex-col items-center overflow-hidden shadow-lg">
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
            <div className="flex flex-col items-start">
              <ItemProductCard type={"SKU"} elem={product?.sku} />
              <ItemProductCard
                type={"Product"}
                elem={`${
                  product?.product?.label || product?.product
                }`.toUpperCase()}
              />
              <ItemProductCard
                type={"Description"}
                elem={product?.description}
              />
              <ItemProductCard
                type={"Brand"}
                elem={`${
                  product?.brand?.label || product?.brand
                }`.toUpperCase()}
              />
              <ItemProductCard
                type={"Model"}
                elem={`${
                  product?.model?.label || product?.model
                }`.toUpperCase()}
              />
              <ItemProductCard
                type={"Color"}
                elem={`${
                  product?.color?.label || product?.color
                }`.toUpperCase()}
              />
              <ItemProductCard
                type={"Price"}
                elem={
                  product?.price?.label ? product?.price?.label : product?.price
                }
              />
              {isAdmin && (
                <ConfirmActionButton
                  buttonChildren={<Trash />}
                  modalTittle={`Confirm product delete`}
                  modalMessage={`Accept to delete the product ${product?.product} with SKU: ${product?.sku}.`}
                  onConfirm={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
