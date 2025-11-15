import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddProduct from "@/components/ProdsComps/AddProduct/AddProduct"
import React from "react"
import "@testing-library/jest-dom"
import { ToastContainer } from "react-toastify"
import { addProductAction } from "../../../actions/product"

jest.mock("../../../actions/product", () => ({
  addProductAction: jest.fn(),
}))

jest.mock("jose", () => ({
  compactDecrypt: jest.fn(),
}))

describe("AddProduct Component", () => {
  beforeAll(() => {
    addProductAction.mockResolvedValue({
      message: "Product added successfully",
    })
    global.URL.createObjectURL = jest.fn(() => "mocked-url")
  })

  it("allows the user to select a brand, product, color, model and fill the stock, price and img fields", async () => {
    const user = userEvent.setup()

    render(<AddProduct />)

    const brandSelect = screen.getByLabelText(/Brand/i)
    await user.selectOptions(brandSelect, "Samsung")
    expect(brandSelect.value).toBe("Samsung")

    const productSelect = screen.getByLabelText(/Product/i)
    await user.selectOptions(productSelect, "Toaster")
    expect(productSelect.value).toBe("Toaster")

    const colorSelect = screen.getByLabelText(/Color/i)
    await user.selectOptions(colorSelect, "Black")
    expect(colorSelect.value).toBe("Black")

    const modelSelect = screen.getByLabelText(/Model/i)
    await user.selectOptions(modelSelect, "A003")
    expect(modelSelect.value).toBe("A003")

    const priceInput = screen.getByPlaceholderText("Price")
    await user.type(priceInput, "199.99")
    expect(priceInput).toHaveValue("199.99")

    const stockInput = screen.getByPlaceholderText("Stock")
    await user.type(stockInput, "50")
    expect(stockInput).toHaveValue("50")

    const file = new File(["img"], "img.jpg", { type: "image/jpg" })
    const imageInput = screen.getByTestId("imgFile")
    await user.upload(imageInput, file)

    await waitFor(() => {
      expect(imageInput.files[0]).toBe(file)
      expect(imageInput.files.length).toBe(1)
    })
  })

  it("verify that every input is required", async () => {
    render(<AddProduct />)

    const priceInput = screen.getByPlaceholderText(/Price/i)
    const stockInput = screen.getByPlaceholderText(/Stock/i)
    const descriptionInput = screen.getByPlaceholderText(/Description/i)

    expect(priceInput).toBeRequired()
    expect(stockInput).toBeRequired()
    expect(descriptionInput).toBeRequired()
  })

  it("allows the user to fill all fields, submit the form and see success toast", async () => {
    const user = userEvent.setup()

    render(
      <>
        <AddProduct />
        <ToastContainer />
      </>
    )

    await user.selectOptions(screen.getByLabelText(/Brand/i), "Samsung")
    await user.selectOptions(screen.getByLabelText(/Product/i), "Toaster")
    await user.selectOptions(screen.getByLabelText(/Color/i), "Black")
    await user.selectOptions(screen.getByLabelText(/Model/i), "A003")

    await user.type(screen.getByPlaceholderText("Price"), "199")
    await user.type(screen.getByPlaceholderText("Stock"), "5")
    await user.type(
      screen.getByPlaceholderText("Description"),
      "Great toaster!"
    )

    const file = new File(["img"], "img.jpg", { type: "image/jpg" })
    const imageInput = screen.getByTestId("imgFile")
    await user.upload(imageInput, file)

    const submitBtn = screen.getByRole("button", { name: /Add product/i })

    user.click(submitBtn)

    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledTimes(1)
      expect(addProduct).toHaveBeenCalledWith({
        brand: "Samsung",
        product: "Toaster",
        color: "Black",
        model: "A003",
        description: "Great toaster!",
        img: "",
        price: "199",
        stock: "5",
      })
    })

    await waitFor(() => {
      expect(
        screen.getByText(/product added successfully/i)
      ).toBeInTheDocument()
    })
  })

  afterAll(() => {
    global.URL.createObjectURL.mockRestore()
  })
})
