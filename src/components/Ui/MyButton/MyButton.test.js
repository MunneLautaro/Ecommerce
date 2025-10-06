import MyButton from "./MyButton"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("MyButton", () => {
  it("displays the button disabled and underline", () => {
    render(<MyButton text={"Im a button"} disabled={true} />)

    const button = screen.getByRole("button", { name: /Im a button/i })

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent(/Im a button/i)
  })

  it("calls correctly the function passed", () => {
    const testFunction = jest.fn()
    render(<MyButton onClick={testFunction} text={"Im a button"} />)

    const button = screen.getByRole("button", { name: /Im a button/i })

    fireEvent.click(button)

    expect(testFunction).toHaveBeenCalled()
    expect(testFunction).toHaveBeenCalledTimes(1)
    expect(button).toBeVisible()
  })
})
