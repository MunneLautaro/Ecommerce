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
  // For file inputs we must NOT set the `value` prop (controlled file inputs
  // prevent programmatic file assignment in tests). Keep value only for
  // non-file inputs.
  const valueProp = type === "file" ? {} : { value }

  return (
    <input
      id={id}
      className="flex my-2 text-white placeholder:text-gray-400 bg-[#6b6b6b] rounded-md focus:outline focus:outline-violet-800 p-1"
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
