"use client"

export default function Select({ elements, type, onChange, value }) {
  const handleChange = (event) => {
    if (onChange) onChange(event)
  }

  return (
    <div className="w-full max-w-xs my-2">
      <label
        htmlFor={type.toLowerCase()}
        className="block text-sm font-medium text-gray-200 mb-1"
      >
        {type}
      </label>
      <select
        id={type.toLowerCase()}
        name={type.toLowerCase()}
        value={value || ""}
        onChange={handleChange}
        className="block w-full rounded-lg border border-gray-300 bg-[#151515] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="" disabled className="text-gray-400">
          Select {type.toLowerCase()}
        </option>
        {elements.map((element, index) => (
          <option className="hover:bg-violet-500" key={index} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  )
}
