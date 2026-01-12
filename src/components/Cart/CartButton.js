export default function ProductCartInfo({ children, onClick, disabled }) {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {children}
    </button>
  )
}
