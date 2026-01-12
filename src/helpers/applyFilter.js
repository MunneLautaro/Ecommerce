import { capitalizeText } from "./capitalizeText"

const applyFilter = (products, prodFilter = {}) => {
  if (Array.isArray(products) === false) return []

  const filtered = products.filter((prod) => {
    return (
      (prodFilter.product
        ? capitalizeText(prod?.product).includes(
            capitalizeText(prodFilter.product)
          )
        : true) &&
      (prodFilter.brand
        ? capitalizeText(prod?.brand).includes(capitalizeText(prodFilter.brand))
        : true) &&
      (prodFilter.model
        ? capitalizeText(prod?.model).includes(capitalizeText(prodFilter.model))
        : true) &&
      (prodFilter.color
        ? capitalizeText(prod?.color).includes(capitalizeText(prodFilter.color))
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
      ? item?.type?.includes(itemFilter.type)
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
