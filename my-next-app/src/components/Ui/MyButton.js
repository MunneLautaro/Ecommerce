export default function MyButton({ bText, bType, bOnClick, underline }) {
  return (
    <button
      className={`${underline} bg-violet-800 rounded-md text-white hover:bg-violet-900 active:bg-violet-950 p-[5px] m-1 text-lg`}
      type={bType}
      onClick={bOnClick}
    >
      {bText}
    </button>
  );
}
