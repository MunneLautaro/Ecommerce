export const calculateMaximum = (products) => {
  if (!Array.isArray(products) || products.length === 0) return 0
  const maxPrice = products.reduce(
    (max, prod) => theHigger(max, prod.price),
    products[0].price
  )
  return maxPrice
}

const theHigger = (n, m) => {
  return n > m ? n : m
}

export const calculateMinimum = (products) => {
  if (!Array.isArray(products) || products.length === 0) return 0
  const minPrice = products.reduce(
    (min, prod) => theLowest(min, prod.price),
    products[0].price
  )
  return minPrice
}

const theLowest = (n, m) => {
  return n < m ? n : m
}
