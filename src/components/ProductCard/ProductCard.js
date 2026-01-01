"use client"
import { useState, useEffect } from "react"
import { deleteProductAction } from "@/actions/product"
import { toast } from "react-toastify"
import { Trash } from "react-feather"
import Image from "next/image"
import Product from "./Product"
import Modal from "@/components/Ui/Modal/Modal"
import Button from "../Ui/Button/Button"

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
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tiempoDeCarga, setTiempoDeCarga] = useState(
    randomIntFromInterval(500, 1500)
  )

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, tiempoDeCarga)
  }, [])

  useEffect(() => {
    console.log("Response:", response)
    if (!response) return
    if (response?.success) {
      toast.success(response?.success)
    } else {
      toast.error(response?.error)
    }
  }, [response])

  const handleDelete = async (e) => {
    e.preventDefault()
    const deletedProduct = await deleteProductAction(product?.sku)
    console.log("Deleted Product:", deletedProduct)
    if (deletedProduct?.success) {
      toast.success(deletedProduct.success)
    } else {
      toast.error(deletedProduct.error)
    }
    setIsDeleteModalOpen(false)
    setIsProductModalOpen(false)
    onSubmit()
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setIsDeleteModalOpen(true)
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
        <>
          <div
            onClick={() => setIsProductModalOpen(true)}
            className="w-[250px] h-[300px] rounded-[15px] bg-gradient-to-b from-[#292929] to-[#151515] m-[10px] p-[5px] flex flex-col items-center overflow-hidden shadow-lg hover:scale-[1.02] transition-transform relative hover:shadow-violet-500/50 cursor-pointer"
          >
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
            <Product product={product} />
            {isAdmin && (
              <div className="mt-2">
                <Button
                  type="button"
                  onClick={handleDeleteClick}
                  text={<Trash size={16} />}
                />
              </div>
            )}
          </div>

          <Modal
            isOpen={isProductModalOpen}
            onClose={() => setIsProductModalOpen(false)}
          >
            <div className="p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                {product?.product?.label || product?.product}
              </h2>
              <div className="flex gap-6">
                {product?.img && (
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <Image
                      src={product.img}
                      alt="Imagen de product"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                <div className="text-white space-y-2">
                  <p>
                    <span className="font-semibold text-violet-400">SKU:</span>{" "}
                    {product?.sku}
                  </p>
                  <p>
                    <span className="font-semibold text-violet-400">
                      Description:
                    </span>{" "}
                    {product?.description}
                  </p>
                  <p>
                    <span className="font-semibold text-violet-400">
                      Brand:
                    </span>{" "}
                    {product?.brand?.label || product?.brand}
                  </p>
                  <p>
                    <span className="font-semibold text-violet-400">
                      Model:
                    </span>{" "}
                    {product?.model?.label || product?.model}
                  </p>
                  <p>
                    <span className="font-semibold text-violet-400">
                      Color:
                    </span>{" "}
                    {product?.color?.label || product?.color}
                  </p>
                  <p>
                    <span className="font-semibold text-violet-400">
                      Price:
                    </span>{" "}
                    {product?.price?.label || product?.price}
                  </p>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <div className="p-5 flex flex-col items-center">
              <h2 className="text-xl text-white font-bold mb-4">
                Confirm product delete
              </h2>
              <p className="mb-6 text-white">
                Accept to delete the product {product?.product} with SKU:{" "}
                {product?.sku}.
              </p>
              <div className="flex flex-row justify-between gap-20">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-70 transition-opacity active:bg-red-900 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-green-400 rounded hover:opacity-45 transition-opacity active:bg-green-700 text-white font-bold"
                >
                  Accept
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  )
}
