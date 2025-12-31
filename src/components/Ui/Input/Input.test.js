import { screen, render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

describe("input", () => {
  it("input test", async () => {
    render(<input type="file" data-testid="imgFile" />)

    const input = screen.getByTestId("imgFile")

    await userEvent.upload(
      input,
      new File(["img"], "img.jpg", { type: "image/jpg" })
    )

    await waitFor(() => {
      expect(input.files.length).toBe(1)
    })
  })
})
