export const applyFilter = (products, prodFilter = {}) => {
  console.log("SE ESTA LLAMANDO")
  console.log({ prodFilter })
  if (Array.isArray(products) === false) return []
  return products.filter((prod) => {
    return (
      (prodFilter.product
        ? prod?.product
            ?.toLowerCase()
            .includes(prodFilter.product.toLowerCase())
        : true) &&
      (prodFilter.brand
        ? prod?.brand?.toLowerCase().includes(prodFilter.brand.toLowerCase())
        : true) &&
      (prodFilter.model
        ? prod?.model?.toLowerCase().includes(prodFilter.model.toLowerCase())
        : true) &&
      (prodFilter.color
        ? prod?.color?.toLowerCase().includes(prodFilter.color.toLowerCase())
        : true) &&
      (prodFilter.price
        ? prod?.price >= prodFilter.price.min &&
          prod?.price <= prodFilter.price.max
        : true)
    )
  })
}
