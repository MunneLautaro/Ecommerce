export default function ItemActionButton({ children, onClick, disabled }) {
  return (
    <button
      className={`flex mt-5 items-center m-5 disabled:opacity-50 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
