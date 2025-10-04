export default function MyButton({ text, type, onClick, underline, disabled }) {
  return (
    <button
      className={`${underline} bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 p-[5px] m-1 mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
