import Button from "../../Ui/Button/Button"
import { ArrowLeft, ArrowRight } from "react-feather"

export default function TablePagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="flex items-center justify-center my-4 space-x-2 ">
      <button
        className="rounded-full bg-violet-800 p-2 hover:bg-violet-900 hover:scale-110 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        <ArrowLeft />
      </button>
      <span className="text-white m-1 mt-2">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="rounded-full bg-violet-800 p-2 hover:bg-violet-900 hover:scale-110 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        <ArrowRight />
      </button>
    </div>
  )
}
