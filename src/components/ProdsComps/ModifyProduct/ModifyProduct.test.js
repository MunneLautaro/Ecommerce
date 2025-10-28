import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ModifyProduct from "./ModifyProduct"

describe("ModifyProduct", () => {
  it("displays correctly both buttons", () => {
    render(<ModifyProduct />)
  })
})
