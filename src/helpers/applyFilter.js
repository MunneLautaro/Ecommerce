const applyFilter = (products, prodFilter = {}) => {
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

const toDayString = (d) => new Date(d).toISOString().slice(0, 10)

const applyItemFilter = (items, itemFilter = {}) => {
  if (!Array.isArray(items)) return []

  return items.filter((item) => {
    const typeMatch = itemFilter.type
      ? item?.type?.toLowerCase().includes(itemFilter.type.toLowerCase())
      : true

    const dateMatch =
      itemFilter.date?.startDate && itemFilter.date?.endDate
        ? (() => {
            const dateValue = item.createdAt
            if (!dateValue) return false
            const itemDay = toDayString(dateValue)
            const startDay = toDayString(itemFilter.date.startDate)
            const endDay = toDayString(itemFilter.date.endDate)
            return itemDay >= startDay && itemDay <= endDay
          })()
        : true

    return typeMatch && dateMatch
  })
}
export { applyFilter, applyItemFilter }
