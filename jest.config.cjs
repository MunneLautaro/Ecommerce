const nextJest = require("next/jest")

const createJSONConfig = nextJest({ dir: "./" })

const ignoreDirs = ["<rootDir>/public", "<rootDir>/\\..+/"]

const customJestConfig = {
  coveragePathIgnorePatterns: [
    ...ignoreDirs,
    "(next|jest|postccs|tailwind).config.js",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  modulePathIgnorePatterns: [...ignoreDirs],
  testEnvironment: "jest-fixed-jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/*.test.{js,jsx,ts,tsx}"],
  testPathIgnorePatterns: [...ignoreDirs],
  verbose: true,
}

module.exports = async (...args) => {
  const fn = createJSONConfig(customJestConfig)
  const res = await fn(...args)
  res.transformIgnorePatterns = res.transformIgnorePatterns.map((pattern) => {
    if (pattern === "/node_modules/") {
      return "/node_modules(?!/(lodash))/"
    }
    return pattern
  })
  return res
}

/*
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^server-only$": "<rootDir>/__mocks__/server-only.js",
  },
}
*/
