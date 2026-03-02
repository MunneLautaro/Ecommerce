"use client"
import Input from "../Ui/Input/Input"
import { CheckOutContext, SessionContext } from "@/contexts"
import { getUserPersonalInfoAction } from "../../actions/userAction"
import { useContext, useEffect } from "react"

export default function CheckOutForm() {
  const [checkOutState, dispatchCheckOut] = useContext(CheckOutContext)
  const [session] = useContext(SessionContext)

  useEffect(() => {
    const getPersonalInfo = async () => {
      const personalInfo = await getUserPersonalInfoAction()
      dispatchCheckOut({
        type: "SET_USER_INFO",
        payload: personalInfo.personalInfo,
      })
    }
    getPersonalInfo()
  }, [])

  return (
    <div className="pt-25 px-4 pb-10 flex justify-center">
      <div className="w-full max-w-lg bg-[#424242] rounded-xl p-8 shadow-lg border border-white/10">
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          Personal Information
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatchCheckOut({ type: "SET_FORM_OPEN", payload: false })
          }}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <Input
                required={true}
                id="name"
                name="name"
                value={checkOutState?.userData?.name || ""}
                placeHolder="Enter your name"
                onChange={(e) => {
                  dispatchCheckOut({
                    type: "SET_USER_DATA",
                    payload: { name: e.target.value },
                  })
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="surname"
                className="text-sm font-medium text-gray-300"
              >
                Surname
              </label>
              <Input
                id="surname"
                name="surname"
                placeHolder="Enter your surname"
                required={true}
                value={checkOutState?.userData?.surname || ""}
                onChange={(e) => {
                  dispatchCheckOut({
                    type: "SET_USER_DATA",
                    payload: { surname: e.target.value },
                  })
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeHolder="Enter your email address"
              required={true}
              value={checkOutState?.userData?.email || ""}
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_USER_DATA",
                  payload: { email: e.target.value },
                })
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-300"
            >
              Phone Number
            </label>
            <Input
              required={true}
              id="phone"
              name="phone"
              value={checkOutState?.userData?.phone || ""}
              placeHolder="Enter your phone number"
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_USER_DATA",
                  payload: { phone: e.target.value },
                })
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-300"
            >
              Shipping Address
            </label>
            <Input
              id="address"
              name="address"
              placeHolder="Enter your street address"
              required={true}
              value={checkOutState?.userData?.deliveryAddress?.street || ""}
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_DELIVERY_ADDRESS_DATA",
                  payload: { street: e.target.value },
                })
              }}
            />

            <Input
              id="city"
              name="city"
              placeHolder="Enter your city"
              value={checkOutState?.userData?.deliveryAddress?.city || ""}
              required={true}
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_DELIVERY_ADDRESS_DATA",
                  payload: { city: e.target.value },
                })
              }}
            />

            <Input
              id="state"
              name="state"
              placeHolder="Enter your state"
              value={checkOutState?.userData?.deliveryAddress?.state || ""}
              required={true}
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_DELIVERY_ADDRESS_DATA",
                  payload: { state: e.target.value },
                })
              }}
            />
            <Input
              id="postalCode"
              name="postalCode"
              placeHolder="Enter your postal code"
              required={true}
              value={checkOutState?.userData?.deliveryAddress?.postalCode || ""}
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_DELIVERY_ADDRESS_DATA",
                  payload: { postalCode: e.target.value },
                })
              }}
            />
            <Input
              id="country"
              name="country"
              placeHolder="Enter your country"
              value={checkOutState?.userData?.deliveryAddress?.country || ""}
              required={true}
              onChange={(e) => {
                dispatchCheckOut({
                  type: "SET_DELIVERY_ADDRESS_DATA",
                  payload: { country: e.target.value },
                })
              }}
            />
          </div>

          <label
            htmlFor="saveInfo"
            className="text-sm text-gray-400 cursor-pointer select-none"
          >
            Save this information for next time
          </label>
          <div className="flex items-center gap-3 mt-1">
            <input
              id="saveInfo"
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-[#6b6b6b] accent-violet-600 cursor-pointer"
              onClick={() => {
                dispatchCheckOut({
                  type: "SET_SAVE_FOR_LATER",
                })
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  )
}
