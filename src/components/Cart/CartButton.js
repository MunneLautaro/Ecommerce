export default function ProductCartInfo({ children, onClick, disabled }) {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {children}
    </button>
  )
}
