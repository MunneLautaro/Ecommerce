import Modal from "../Ui/Modal/Modal"

export default function DeleteProductModal({
  product,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDelete,
}) {
  return (
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
  )
}
