const hacerElecSku = (prodName) => {
  const prods = {
    heladera: "001",
    microondas: "002",
    licuadora: "003",
    tostadora: "004",
    airfryer: "005",
  }
  return prods[prodName.toLowerCase()] ?? 0
}

const hacerColorSku = (prodColor) => {
  const colors = {
    blanco: "01",
    negro: "02",
    azul: "03",
    verde: "04",
    rojo: "05",
    rosa: "06",
    gris: "07",
  }
  return colors[prodColor.toLowerCase()] ?? 0
}

const hacerModeloSku = (prodModel) => {
  const models = {
    A001: "A001",
    A002: "A002",
    A003: "A003",
    A004: "A004",
    A005: "A005",
  }
  return models[prodModel.toUpperCase()] ?? 0
}

const hacerMarcaSku = (prodBrand) => {
  const brands = {
    samsung: "M1",
    lg: "M2",
    phillips: "M3",
    philco: "M4",
    electrolux: "M5",
    panasonic: "M6",
  }
  return brands[prodBrand.toLowerCase()] ?? new error()
}

export default function ConvertirEnSku(name, color, model, brand) {
  try {
    const elecSku = hacerElecSku(name)
    const colorSku = hacerColorSku(color)
    const modelSku = hacerModeloSku(model)
    const brandSku = hacerMarcaSku(brand)
    return `${elecSku}${colorSku}${modelSku}${brandSku}`
  } catch (error) {
    console.log("pincho")
    return false
  }
}
