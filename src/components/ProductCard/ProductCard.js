"use client"
import { useState, useEffect, useContext } from "react"
import { deleteProductAction } from "@/actions/product"
import { toast } from "react-toastify"
import { Trash, Plus, Minus } from "react-feather"
import Image from "next/image"
import Product from "./Product"
import Button from "../Ui/Button/Button"
import Skeleton from "./Skeleton"
import ProductDetailsModal from "./ProductDetailsModal"
import DeleteProductModal from "./DeleteProductModal"
import { CartContext } from "@/contexts/CartContext"

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

  const { cart, dispatchCart } = useContext(CartContext)

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
        <Skeleton />
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
              <div className="mt-2 flex flex-row gap-2">
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatchCart({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    })
                  }}
                  text={<Minus size={16} />}
                />
                <Button
                  type="button"
                  onClick={handleDeleteClick}
                  text={<Trash size={16} />}
                />
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatchCart({ type: "ADD_TO_CART", payload: product })
                  }}
                  text={<Plus size={16} />}
                />
              </div>
            )}
          </div>

          <ProductDetailsModal
            product={product}
            isProductModalOpen={isProductModalOpen}
            setIsProductModalOpen={setIsProductModalOpen}
          />

          <DeleteProductModal
            product={product}
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  )
}
