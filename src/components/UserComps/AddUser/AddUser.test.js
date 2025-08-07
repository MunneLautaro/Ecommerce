import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AddUser from "./AddUser"
import { addUser } from "@/actions/index"
import { ToastContainer } from "react-toastify"

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

jest.mock("../../actions/index", () => ({
  modUser: jest.fn(),
}))

describe("AddUser", () => {
  it("displays correctly the username input", () => {
    render(<AddUser />)
  })
})
