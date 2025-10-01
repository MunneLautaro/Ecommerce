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
  it("displays correctly the old user input", () => {
    render(<DeleteProduct />)

    const userInput = screen.getByPlaceholderText("Username")

    expect(userInput).toBeInTheDocument()
    expect(userInput).toBeRequired()
  })

  
})
