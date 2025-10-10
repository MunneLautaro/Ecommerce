import MyInput from "./MyInput"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("MyInput", () => {
  it("change values via the fireEvent.change method", () => {
    const handleChange = jest.fn()
    render(
      <MyInput type={"text"} onChange={handleChange} placeHolder={"Text"} />
    )

    const input = screen.getByPlaceholderText(/text/i)

    fireEvent.change(input, { target: { value: "a" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input.value).toBe("a")
    expect(input).toBeVisible()
  })
})
