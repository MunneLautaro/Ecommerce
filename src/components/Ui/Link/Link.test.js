import Link from "./Link"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Link", () => {
  it("displays correctyle the link", () => {
    render(<Link url={"testUrl"}>Im a link</Link>)

    const link = screen.getByRole("link", { name: /Im a link/i })

    expect(link).toBeVisible()
    expect(link).toHaveTextContent(/Im a link/i)
  })
})
