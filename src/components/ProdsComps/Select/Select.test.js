import { render, screen } from "@testing-library/react"
import Select from "../Select/Select"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import React from "react"

describe("Select Component", () => {
  it("renders the select with correct options", () => {
    render(
      <Select
        elements={["Option 1", "Option 2"]}
        type="Test"
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.getByLabelText(/Test/i)).toBeInTheDocument()

    expect(
      screen.getByRole("option", { name: /Select test/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Option 2" })).toBeInTheDocument()
  })

  it("displays the selected value", () => {
    render(
      <Select
        elements={["Red", "Green", "Blue"]}
        type="Color"
        value="Green"
        onChange={() => {}}
      />
    )

    const select = screen.getByLabelText(/Color/i)
    expect(select.value).toBe("Green")
  })

  it("it calls handleChange and uptdate the", async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    const Wrapper = () => {
      const [selected, setSelected] = React.useState("")
      return (
        <Select
          elements={["Option 1", "Option 2"]}
          type="Test"
          value={selected}
          onChange={(e) => {
            handleChange(e)
            setSelected(e.target.value)
          }}
        />
      )
    }

    render(<Wrapper />)

    const select = screen.getByLabelText(/Test/i)

    await user.selectOptions(select, "Option 1")

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(select.value).toBe("Option 1")
  })
})
