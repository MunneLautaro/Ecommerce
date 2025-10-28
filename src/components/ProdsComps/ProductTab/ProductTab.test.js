import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ProductTab from "./ProductTab"
import userEvent from "@testing-library/user-event"

describe("ProductTab", () => {
  it("displays correctly both buttons and the initial tab(addProduct)", () => {
    render(<ProductTab />)

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Modify" })).toBeInTheDocument()
    expect(screen.getByTestId("AddProductComponent")).toBeInTheDocument()
  })

  it("displays the modProduct tab correctly", async () => {
    const user = userEvent.setup()

    render(<ProductTab />)
    const modifyButton = screen.getByRole("button", { name: "Modify" })
    await user.click(modifyButton)

    expect(screen.getByTestId("ModProductComponent")).toBeInTheDocument()
  })
})
