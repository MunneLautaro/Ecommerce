export default function MyButton({
  text,
  type,
  onClick,
  underline,
  disabled,
  m = 1,
  textColor = "white",
}) {
  return (
    <button
      className={`${underline} transition:ease-in-out duration-200 bg-violet-800 rounded-md text-${textColor} hover:bg-violet-900 active:bg-violet-950 p-[5px] m-${m} mt-2 text-lg disabled:opacity-50 disabled:hover:bg-gray-300`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
