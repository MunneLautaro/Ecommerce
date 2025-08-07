import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import ModUser from "./ModUser"
import { modUser } from "@/actions/index"
import { ToastContainer } from "react-toastify"

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

jest.mock("../../actions/index", () => ({
  modUser: jest.fn(),
}))

describe("ModUsers", () => {
  it("displays correctly the old user input", () => {
    render(<ModUser />)

    const userInput = screen.getByPlaceholderText("Username")

    expect(userInput).toBeInTheDocument()
    expect(userInput).toBeRequired()
  })

  it("displays correctly the new user input", () => {
    render(<ModUser />)

    const newUserInput = screen.getByPlaceholderText("New username")

    expect(newUserInput).toBeInTheDocument()
    expect(newUserInput).toBeRequired()
  })

  it("displays correctly the new password input", () => {
    render(<ModUser />)

    const newPasswordInput = screen.getByPlaceholderText("New password")

    expect(newPasswordInput).toBeInTheDocument()
    expect(newPasswordInput).toBeRequired()
  })

  it("displays correctly the submit button", () => {
    render(<ModUser />)

    const submitButton = screen.getByRole("button", { name: /modify user/i })

    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
  })

  it("submits the form and shows a success toast", async () => {
    modUser.mockResolvedValueOnce({ message: "User modified successfully" })

    render(
      <>
        <ModUser />
        <ToastContainer />
      </>
    )

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "oldUser" },
    })

    fireEvent.change(screen.getByPlaceholderText("New username"), {
      target: { value: "newUser" },
    })

    fireEvent.change(screen.getByPlaceholderText("New password"), {
      target: { value: "newPassword123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /modify user/i }))

    await waitFor(() =>
      expect(screen.getByText("User modified successfully")).toBeInTheDocument()
    )
  })

  it("shows an error toast if response contains an error", async () => {
    modUser.mockResolvedValueOnce({ error: "Something went wrong" })

    render(
      <>
        <ModUser />
        <ToastContainer />
      </>
    )

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "user" },
    })

    fireEvent.change(screen.getByPlaceholderText("New username"), {
      target: { value: "newUser" },
    })

    fireEvent.change(screen.getByPlaceholderText("New password"), {
      target: { value: "password" },
    })

    fireEvent.click(screen.getByRole("button", { name: /modify user/i }))

    await waitFor(() =>
      expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    )
  })
})
