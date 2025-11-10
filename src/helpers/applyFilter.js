export const applyFilter = (products, prodFilter = {}) => {
  if (Array.isArray(products) === false) return []

  const filtered = products.filter((prod) => {
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
      (prodFilter.price?.min != null && prodFilter?.price?.max != null
        ? prod?.price >= prodFilter?.price?.min &&
          prod?.price <= prodFilter?.price?.max
        : true)
    )
  })

  if (prodFilter.isAscending !== undefined) {
    return filtered.sort((a, b) => {
      return prodFilter.isAscending ? a.price - b.price : b.price - a.price
    })
  }

  return filtered
}
