import Button from "../../Ui/Button/Button"

export default function TablePagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        text={"Previous"}
      />
      <span className="text-white m-1 mt-2">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        text={"next"}
      />
    </div>
  )
}
