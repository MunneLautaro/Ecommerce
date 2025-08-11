import { render, screen, waitFor, act, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import AddUser from "./AddUser"
import { addUserAction } from "../../../actions/index"
import { ToastContainer } from "react-toastify"
import userEvent from "@testing-library/user-event"

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

jest.mock("../../../actions/index", () => ({
  addUserAction: jest.fn(),
}))

describe("AddUser", () => {
  it("displays correctly the username input", () => {
    render(<AddUser />)

    const userInput = screen.getByPlaceholderText(/username/i)

    expect(userInput).toBeInTheDocument()
    expect(userInput).toBeRequired()
  })
  it("displays correctly the password input", () => {
    render(<AddUser />)

    const passwordInput = screen.getByPlaceholderText(/password/i)

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toBeRequired()
  })

  it("submits the form with correct inputs and shows success toast", async () => {
    const user = userEvent.setup()
    addUserAction.mockResolvedValueOnce({ success: "User added successfully" })

    render(
      <>
        <AddUser />
        <ToastContainer />
      </>
    )

    // Verificar que los inputs están en el documento
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()

    // Simular la escritura en los inputs
    await user.type(screen.getByPlaceholderText("Username"), "testUser")
    await user.type(screen.getByPlaceholderText(/password/i), "testPassword")

    // Verificar que los valores se han ingresado correctamente
    expect(screen.getByPlaceholderText("Username")).toHaveValue("testUser")
    expect(screen.getByPlaceholderText("Password")).toHaveValue("testPassword")

    // Obtener el botón de submit
    const submitBtn = screen.getByRole("button", { name: /add user/i })

    // Hacer click en el botón de submit
    await act(async () => {
      fireEvent.click(submitBtn)
    })

    // Verificar que el toast de éxito aparezca
    await waitFor(() => {
      expect(screen.getByText(/user added successfully/i)).toBeInTheDocument()
    })

    // Verificar que la acción fue llamada correctamente
    expect(addUserAction).toHaveBeenCalledWith({
      user: "testUser",
      password: "testPassword",
      userAgent:
        "Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3",
    })
  })
})
