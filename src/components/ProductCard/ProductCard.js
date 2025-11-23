"use client"
import { useState, useEffect } from "react"
import { deleteProductAction } from "@/actions/product"
import { toast } from "react-toastify"
import { Trash } from "react-feather"
import Image from "next/image"
import ItemProductCard from "./ItemProductCard"
import MyButton from "../Ui/MyButton/MyButton"
import Modal from "../Ui/Modal/Modal"

export default function ProductCard({
  product,
  isCarrito,
  display,
  isAdmin,
  onSubmit,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setIsModalOpen(false)
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
              <ItemProductCard type={"Product"} elem={product?.product} />
              <ItemProductCard
                type={"Description"}
                elem={product?.description}
              />
              <ItemProductCard type={"Brand"} elem={product?.brand} />
              <ItemProductCard type={"Model"} elem={product?.model} />
              <ItemProductCard type={"Color"} elem={product?.color} />
              <ItemProductCard type={"Price"} elem={product?.price} />

              {isAdmin && (
                <MyButton
                  text={<Trash />}
                  onClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {isAdmin && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl text-black font-bold mb-4">Confirm delete</h2>
          <p className="mb-6 text-black">
            Are you sure you want to delete the product {product?.product} with
            SKU {product?.sku}?
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => {
                setIsModalOpen(false)
              }}
              className="px-4 py-2 bg-gray-400 rounded hover:opacity-45 transition-opacity active:bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-70 transition-opacity active:bg-red-900"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
