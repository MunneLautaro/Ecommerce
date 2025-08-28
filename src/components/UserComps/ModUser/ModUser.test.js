import { render, screen, waitFor, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import ModUser from "./ModUser"
import { modUser } from "@/actions/index"
import { ToastContainer } from "react-toastify"
import userEvent from "@testing-library/user-event"

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

jest.mock("../../../actions/index", () => ({
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
    const user = userEvent.setup()

    modUser.mockResolvedValueOnce({ success: "User modified successfully" })

    render(
      <>
        <ModUser />
        <ToastContainer />
      </>
    )

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("New username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("New password")).toBeInTheDocument()

    const usernameInput = await screen.findByPlaceholderText("Username")
    await user.type(usernameInput, "testUsername")

    const newUsernameInput = await screen.findByPlaceholderText("New username")
    await user.type(newUsernameInput, "newTestUsername")

    const newPasswordInput = await screen.findByPlaceholderText("New password")
    await user.type(newPasswordInput, "newTestPassword")

    expect(usernameInput).toHaveValue("testUsername")
    expect(newUsernameInput).toHaveValue("newTestUsername")
    expect(newPasswordInput).toHaveValue("newTestPassword")

    const submitBtn = screen.queryByRole("button", { name: /Modify user/i })

    await act(async () => {
      user.click(submitBtn)
    })

    await waitFor(() =>
      expect(screen.getByText("User modified successfully")).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(modUser).toHaveBeenCalledWith({
        user: "testUsername",
        newUser: "newTestUsername",
        md5: "f64714d017b678a1d497d3284903ea50",
        sha1: "6090e82653e07dc45899bc6532b8261e18661d06",
        userAgent:
          "Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3",
      })
    })
  })
})
