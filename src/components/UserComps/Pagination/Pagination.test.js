import { fireEvent, render, screen } from "@testing-library/react"
import Pagination from "./Pagination"
import "@testing-library/jest-dom"

describe("Pagination", () => {
  it("Verify that the current page is 1 of 3", () => {
    render(<Pagination currentPage={1} totalPages={3} />)

    const spanCurrentPage = screen.getByText("Page 1 of 3")
    expect(spanCurrentPage).toBeInTheDocument()
  })

  it("Verify that the previous button is disabled if there's no previous page", () => {
    render(<Pagination currentPage={1} totalPages={3} />)

    const prevButton = screen.getByRole("button", { name: /previous/i })

    expect(prevButton).toBeDisabled()
  })

  it("Verify that the next button is disabled if there's no next page", () => {
    render(<Pagination currentPage={3} totalPages={3} />)

    const prevButton = screen.getByRole("button", { name: /next/i })

    expect(prevButton).toBeDisabled()
  })

  it("Verify that the previous button is enable ", () => {
    render(<Pagination currentPage={2} totalPages={3} />)

    const prevButton = screen.getByRole("button", { name: /previous/i })

    expect(prevButton).toBeEnabled()
  })

  it("Verify that the next button is enable ", () => {
    render(<Pagination currentPage={2} totalPages={3} />)

    const nextButton = screen.getByRole("button", { name: /next/i })

    expect(nextButton).toBeEnabled()
  })
})
