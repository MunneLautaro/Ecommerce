const config = require("@testing-library/jest-dom")

const TextEncoder = require("util").TextEncoder
const TextDecoder = require("util").TextDecoder

Object.assign(global, { TextEncoder, TextDecoder })

jest.mock("./src/lib/session", () => ({
  SignJWT: jest.fn(),
  jwtVerify: jest.fn(),
}))

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}))
