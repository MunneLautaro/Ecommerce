import Modal from "@/components/Ui/Modal/Modal"
import Button from "@/components/Ui/Button/Button"
import { useState } from "react"

export default function ConfirmActionButton({
  buttonChildren,
  modalTittle,
  modalMessage,
  onCancel = () => {},
  onConfirm,
  isDisabled,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      {" "}
      <Button
        disabled={isDisabled}
        onClick={() => {
          setIsModalOpen((prev) => !prev)
        }}
        text={buttonChildren}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-5 flex flex-col items-center">
          <div className="flex flex-col">
            <h2 className="text-xl text-white font-bold mb-4">{modalTittle}</h2>
            <p className="mb-6 text-white">{modalMessage}</p>
          </div>
          <div className="flex flex-row justify-between gap-20">
            <button
              onClick={(e) => {
                e.preventDefault()
                onCancel()
                setIsModalOpen(false)
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-70 transition-opacity active:bg-red-900 disabled: bg-grey-300 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                onConfirm()
                setIsModalOpen(false)
              }}
              className="px-4 py-2 bg-green-400 rounded hover:opacity-45 transition-opacity active:bg-green-700 text-white disabled: bg-grey-300 font-bold"
              disabled={isDisabled}
            >
              Accept
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
