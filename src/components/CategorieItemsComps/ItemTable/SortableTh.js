export default function SortableTh({ label, sortField, onSort, children }) {
  return (
    <th className="p-2 border border-[#212121]">
      <div className="flex flex-col justify-center items-center">
        <div
          onClick={() => onSort(sortField)}
          className="mr-2 hover:underline cursor-pointer"
        >
          {label}
        </div>

        {children && <div>{children}</div>}
      </div>
    </th>
  )
}
