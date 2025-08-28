import DeleteUser from "./DeleteUser"
import userEvent from "@testing-library/user-event"
import { render, screen, waitFor, act } from "@testing-library/react"
import { ToastContainer } from "react-toastify"
import { deleteUser } from "@/actions/index"
import "@testing-library/jest-dom"

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

jest.mock("../../../actions/index", () => ({
  deleteUser: jest.fn(),
}))

describe("DeleteUser", () => {
  it("displays correctly the username input", () => {
    render(<DeleteUser />)

    const usernameInput = screen.getByPlaceholderText("Username")

    expect(usernameInput).toBeInTheDocument()
    expect(usernameInput).toBeRequired()
  })

  it("displays correctly the submit button", () => {
    render(<DeleteUser />)

    const deleteButton = screen.getByRole("button", { name: /delete user/i })

    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toBeEnabled()
  })

  it("submits the form and shows a success toast", async () => {
    const user = userEvent.setup()

    deleteUser.mockResolvedValueOnce({ success: "User deleted successfully" })

    render(
      <>
        <DeleteUser />
        <ToastContainer />
      </>
    )

    const usernameInput = await screen.findByPlaceholderText("Username")
    await user.type(usernameInput, "testUsername")

    expect(usernameInput).toHaveValue("testUsername")

    const submitBtn = screen.getByRole("button", { name: /Delete user/i })

    await act(async () => {
      user.click(submitBtn)
    })

    await waitFor(() =>
      expect(screen.getByText("User deleted successfully")).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith({
        user: "testUsername",
      })
    })
  })
})
