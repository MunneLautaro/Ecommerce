import { render, screen, waitFor, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import DeleteProduct from "./DeleteProduct"
//import { modUser } from "@/actions/index"
import { ToastContainer } from "react-toastify"
import userEvent from "@testing-library/user-event"

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

describe("DeleteProduct", () => {
  it("displays correctly the productID input", () => {
    render(<DeleteProduct />)

    const productIdInput = screen.getByPlaceholderText("Product ID/SKU")

    expect(productIdInput).toBeInTheDocument()
    expect(productIdInput).toBeRequired()
    expect(productIdInput).toHaveAttribute("type", "text")
  })
})
