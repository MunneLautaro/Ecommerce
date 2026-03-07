export default function Caption({ children, customStyle }) {
  return (
    <h2
      className={`${customStyle ? customStyle : "text-xl font-bold text-gray-200 "}`}
    >
      {children}
    </h2>
  )
}
