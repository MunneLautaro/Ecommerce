export default function Input({
  type = "text",
  name,
  placeHolder,
  required = false,
  id,
  value,
  onChange,
  accept,
  dataTestId,
  disabled = false,
}) {
  const valueProp = type === "file" ? {} : { value }

  return (
    <input
      id={id}
      className="flex my-2 w-full text-white placeholder:text-gray-400 bg-[#6b6b6b] rounded-md focus:outline focus:outline-violet-800 p-1"
      type={type}
      name={name}
      placeholder={placeHolder}
      required={required}
      {...valueProp}
      onChange={onChange}
      accept={accept}
      data-testid={dataTestId}
      disabled={disabled}
    />
  )
}
