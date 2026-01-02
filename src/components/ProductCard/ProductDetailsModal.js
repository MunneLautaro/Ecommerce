import Modal from "../Ui/Modal/Modal"
import Image from "next/image"

export default function ProductDetailsModal({
  product,
  isProductModalOpen,
  setIsProductModalOpen,
}) {
  return (
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
              <span className="font-semibold text-violet-400">Brand:</span>{" "}
              {product?.brand?.label || product?.brand}
            </p>
            <p>
              <span className="font-semibold text-violet-400">Model:</span>{" "}
              {product?.model?.label || product?.model}
            </p>
            <p>
              <span className="font-semibold text-violet-400">Color:</span>{" "}
              {product?.color?.label || product?.color}
            </p>
            <p>
              <span className="font-semibold text-violet-400">Price:</span>{" "}
              {product?.price?.label || product?.price}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
