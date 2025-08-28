import MyLink from "./MyLink"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("MyLink", () => {
  it("displays correctyle the link", () => {
    render(<MyLink text={"Im a link"} url={"testUrl"} />)

    const link = screen.getByRole("link", { name: /Im a link/i })

    expect(link).toBeVisible()
    expect(link).toHaveTextContent(/Im a link/i)
  })
})
