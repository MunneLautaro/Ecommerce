export default function MyInput({
  iType = "text",
  iName,
  iPlaceHolder,
  iIsRequired = false,
  iId,
  iValue,
  iOnChange,
  iAccept,
}) {
  return (
    <input
      id={iId}
      className="flex my-2 text-white placeholder:text-gray-400 bg-[#6b6b6b] rounded-md focus:outline focus:outline-violet-800 p-1"
      type={iType}
      name={iName}
      placeholder={iPlaceHolder}
      required={iIsRequired}
      value={iValue}
      onChange={iOnChange}
      accept={iAccept}
    />
  )
}
