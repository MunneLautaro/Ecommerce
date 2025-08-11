import { fireEvent, render, screen } from "@testing-library/react"
import Table from "./Table"
import "@testing-library/jest-dom"
import { mockUsers } from "../../../../test/mock"

describe("Table", () => {
  it("displays all usernames in the first page of the table", () => {
    render(<Table users={mockUsers} />)

    const firstPageUsers = mockUsers.slice(0, 10)
    firstPageUsers.forEach((u) => {
      expect(screen.getByText(u.user)).toBeInTheDocument()
    })
  })

  it("displays all md5 in first page of the table", () => {
    render(<Table users={mockUsers} />)

    const md5Cells = screen.getAllByTestId(/user-md5-/)

    expect(md5Cells.length).toEqual(10)

    const firstPageUsers = mockUsers.slice(0, 10)

    firstPageUsers.forEach((u) => {
      const md5Cell = screen.getByTestId(`user-md5-${u._id}`)
      expect(md5Cell).toHaveTextContent(String(u.md5))
    })
  })

  it("displays all sha1 in the first page of the table", () => {
    render(<Table users={mockUsers} />)

    const sha1Cells = screen.getAllByTestId(/user-sha1-/)

    expect(sha1Cells.length).toEqual(10)

    const firstPageUsers = mockUsers.slice(0, 10)

    firstPageUsers.forEach((u) => {
      const sha1Cell = screen.getByTestId(`user-sha1-${u._id}`)
      expect(sha1Cell).toHaveTextContent(String(u.sha1))
    })
  })

  it("displays 10 users per page", () => {
    render(<Table users={mockUsers} />)

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`User ${i}`)).toBeInTheDocument()
    }

    expect(screen.queryByText("User 11")).not.toBeInTheDocument()
  })

  it("verify that next and prev button works correctly", () => {
    render(<Table users={mockUsers} />)

    const nextButton = screen.getByRole("button", { name: /next/i })
    const previousButton = screen.getByRole("button", { name: /previous/i })

    fireEvent.click(nextButton)

    expect(screen.getByText("User 11")).toBeInTheDocument()
    expect(screen.queryByText("User 1")).not.toBeInTheDocument()

    fireEvent.click(previousButton)

    expect(screen.getByText("User 1")).toBeInTheDocument()
    expect(screen.queryByText("User 11")).not.toBeInTheDocument()
  })

  it("verify that is the correct page", () => {
    render(<Table users={mockUsers} />)

    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /next/i }))

    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument()
  })

  it("verify the button is disabled if there's no previous page", () => {
    render(<Table users={mockUsers} />)

    const previousButton = screen.getByRole("button", { name: /previous/i })

    expect(previousButton).toBeDisabled()
  })

  it("verify the button is disabled if there's no next page", () => {
    render(<Table users={mockUsers} />)

    const nextButton = screen.getByRole("button", { name: /next/i })

    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    expect(nextButton).toBeDisabled()
  })
})

/*
[
  ("not",
  "rejects",
  "resolves",
  "toBe",
  "toBeCloseTo",
  "toBeDefined",
  "toBeFalsy",
  "toBeGreaterThan",
  "toBeGreaterThanOrEqual",
  "toBeInstanceOf",
  "toBeLessThan",
  "toBeLessThanOrEqual",
  "toBeNaN",
  "toBeNull",
  "toBeTruthy",
  "toBeUndefined",
  "toContain",
  "toContainEqual",
  "toEqual",
  "toHaveLength",
  "toHaveProperty",
  "toMatch",
  "toMatchObject",
  "toStrictEqual",
  "toHaveBeenCalled",
  "toHaveBeenCalledTimes",
  "toHaveBeenCalledWith",
  "toHaveBeenLastCalledWith",
  "toHaveBeenNthCalledWith",
  "toHaveLastReturnedWith",
  "toHaveNthReturnedWith",
  "toHaveReturned",
  "toHaveReturnedTimes",
  "toHaveReturnedWith",
  "toThrow",
  "toMatchInlineSnapshot",
  "toMatchSnapshot",
  "toThrowErrorMatchingInlineSnapshot",
  "toThrowErrorMatchingSnapshot",
  "toBeChecked",
  "toBeDisabled",
  "toBeEmpty",
  "toBeEmptyDOMElement",
  "toBeEnabled",
  "toBeInTheDOM",
  "toBeInTheDocument",
  "toBeInvalid",
  "toBePartiallyChecked",
  "toBeRequired",
  "toBeValid",
  "toBeVisible",
  "toContainElement",
  "toContainHTML",
  "toHaveAccessibleDescription",
  "toHaveAccessibleErrorMessage",
  "toHaveAccessibleName",
  "toHaveAttribute",
  "toHaveClass",
  "toHaveDescription",
  "toHaveDisplayValue",
  "toHaveErrorMessage",
  "toHaveFocus",
  "toHaveFormValues",
  "toHaveRole",
  "toHaveSelection",
  "toHaveStyle",
  "toHaveTextContent",
  "toHaveValue")
]*/
