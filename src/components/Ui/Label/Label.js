export default function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-200 pl-1">
      {children}
    </label>
  )
}
