import MyButton from "../../Ui/MyButton/MyButton"

export default function TablePagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <MyButton
        bDisabled={currentPage === 1}
        bOnClick={() => setCurrentPage((p) => p - 1)}
        bText={"Previous"}
      />
      <span className="text-white m-1 mt-2">
        Page {currentPage} of {totalPages}
      </span>

      <MyButton
        bDisabled={currentPage === totalPages}
        bOnClick={() => setCurrentPage((p) => p + 1)}
        bText={"next"}
      />
    </div>
  )
}
