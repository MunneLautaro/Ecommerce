import { queryHelpers, buildQueries } from "@testing-library/react"
import { render, queries, within } from "@testing-library/react"
import * as customQueries from "./custom-queries"

const allQueries = {
  ...queries,
  ...customQueries,
}

const customScreen = within(document.body, allQueries)
const customWithin = (element) => within(element, allQueries)
const customRender = (ui, options) =>
  render(ui, { queries: allQueries, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export {
  customScreen as screen,
  customWithin as within,
  customRender as render,
}

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataCy = (...args) =>
  queryHelpers.queryAllByAttribute("data-cy", ...args)

const getMultipleError = (c, dataCyValue) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`
const getMissingError = (c, dataCyValue) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`

const [
  queryByDataCy,
  getAllByDataCy,
  getByDataCy,
  findAllByDataCy,
  findByDataCy,
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError)

export {
  queryByDataCy,
  queryAllByDataCy,
  getByDataCy,
  getAllByDataCy,
  findAllByDataCy,
  findByDataCy,
}
