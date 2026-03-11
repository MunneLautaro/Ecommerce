import Modal from "../Ui/Modal/Modal"
import Image from "next/image"
import { X } from "react-feather"
import { SessionContext } from "@/contexts"
import { useContext } from "react"

export default function ProductDetailsModal({
  product,
  isProductModalOpen,
  setIsProductModalOpen,
}) {
  const [sessionState] = useContext(SessionContext)
  const isAdmin = sessionState?.user?.isAdmin

  const fields = [
    ...(isAdmin ? [{ label: "SKU", value: product?.sku }] : []),
    { label: "Brand", value: product?.brand?.label || product?.brand },
    { label: "Model", value: product?.model?.label || product?.model },
    { label: "Color", value: product?.color?.label || product?.color },
    { label: "Price", value: `$ ${product?.price?.label || product?.price}` },
  ]

  return (
    <Modal
      isOpen={isProductModalOpen}
      onClose={() => setIsProductModalOpen(false)}
    >
      <div className="relative w-full max-w-xl min-w-[480px]">
        <button
          onClick={() => setIsProductModalOpen(false)}
          className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-5 pr-6 border-b border-white/10 pb-3">
          {product?.product?.label || product?.product}
        </h2>

        <div className="flex gap-6">
          {product?.img && (
            <div className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={product.img}
                alt={product?.product?.label || product?.product}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          )}

          <div className="flex flex-col gap-3 flex-1">
            {product?.description && (
              <p className="text-sm text-gray-300 leading-relaxed border-b border-white/10 pb-3">
                {product.description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {fields.map(
                ({ label, value }) =>
                  value && (
                    <div key={label}>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-sm text-white font-medium">{value}</p>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
