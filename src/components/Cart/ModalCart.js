import { X } from "lucide-react"

export default function ModalCart({ open, onClose, children }) {
  return (
    //backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-color
        ${open ? "visible bg-black/20" : "invisible"}`}
    >
      {/*modal */}
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={`bg-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity"}`}
      ></div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
      >
        <X />
      </button>
      {children}
    </div>
  )
}
