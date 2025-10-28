import { render, screen, waitFor } from "@testing-library/react"
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

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()

    const usernameInput = await screen.findByPlaceholderText("Username")
    await user.type(usernameInput, "testUser")

    const passwordInput = await screen.findByPlaceholderText("Password")
    await user.type(passwordInput, "testPassword")

    expect(usernameInput).toHaveValue("testUser")
    expect(passwordInput).toHaveValue("testPassword")

    const submitBtn = screen.queryByRole("button", { name: /add user/i })

    await user.click(submitBtn)

    /*
    Problema: los campos de user y password devolvian undefined, sin embargo los test que checkeaban
    que estos mismos esten completos pasaban bien.

    Solucion: Cree un estado para el formulario el cual se va llenando a medida que el usuario ingresa
    los datos correspondientes y luego le envio ese formulario a la funcion "addUserAction"
    */
    await waitFor(() => {
      expect(addUserAction).toHaveBeenCalledWith({
        user: "testUser",
        md5: "fed3b61b26081849378080b34e693d2e",
        sha1: "82f8809f42d911d1bd5199021d69d15ea91d1fad",
        userAgent:
          "Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3",
      })
    })

    await waitFor(() => {
      expect(screen.getByText(/user added successfully/i)).toBeInTheDocument()
    })
  })
})
