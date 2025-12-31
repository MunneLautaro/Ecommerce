const createSku = (data) => {
  try {
    const productNameId = data?.product?.value ?? 0
    const colorId = data?.color?.value ?? 0
    const modelId = data?.model?.value ?? 0
    const brandId = data?.brand?.value ?? 0
    return `${productNameId}${colorId}${modelId}${brandId}`
  } catch (error) {
    return false
  }
}

export { createSku }
