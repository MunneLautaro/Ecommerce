const makeSkuProd = (product) => {
  if (!product) return 0
  const prods = {
    refrigerator: "001",
    microwave: "002",
    blender: "003",
    toaster: "004",
    airfryer: "005",
  }
  return prods[product.toLowerCase()] ?? 0
}

const makeColorSku = (prodColor) => {
  const colors = {
    white: "01",
    black: "02",
    blue: "03",
    green: "04",
    red: "05",
    pink: "06",
    gray: "07",
  }
  return colors[prodColor.toLowerCase()] ?? 0
}

const makeModelSku = (prodModel) => {
  const models = {
    A001: "A001",
    A002: "A002",
    A003: "A003",
    A004: "A004",
    A005: "A005",
  }
  return models[prodModel.toUpperCase()] ?? 0
}

const makeBrandSku = (prodBrand) => {
  const brands = {
    samsung: "M1",
    lg: "M2",
    phillips: "M3",
    philco: "M4",
    electrolux: "M5",
    panasonic: "M6",
  }
  return brands[prodBrand.toLowerCase()] ?? 0
}

const createSku = (product, color, model, brand) => {
  try {
    const elecSku = makeSkuProd(product)
    const colorSku = makeColorSku(color)
    const modelSku = makeModelSku(model)
    const brandSku = makeBrandSku(brand)
    return `${elecSku}${colorSku}${modelSku}${brandSku}`
  } catch (error) {
    return false
  }
}

export { createSku }
