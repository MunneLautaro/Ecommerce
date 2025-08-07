import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import ShowUsers from "./ShowUsers"
import { mockUsers } from "../../../test/mock"

describe("ShowUsers", () => {
  it("shows and hides the table by clicking the button", () => {
    render(<ShowUsers users={mockUsers} />)
    expect(screen.queryByRole("table")).not.toBeInTheDocument()

    const showButton = screen.getByRole("button", { name: /show users/i })
    fireEvent.click(showButton)

    expect(screen.getByRole("table")).toBeInTheDocument()

    const hideButton = screen.getByRole("button", { name: /hide users/i })
    expect(hideButton).toBeInTheDocument()

    fireEvent.click(hideButton)

    expect(screen.queryByRole("table")).not.toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /show users/i })
    ).toBeInTheDocument()
  })
})
