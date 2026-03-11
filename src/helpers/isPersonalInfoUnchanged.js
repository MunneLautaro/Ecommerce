export function isPersonalInfoUnchanged(original, current) {
  if (!original || !current) return true

  const topLevelFields = ["name", "surname", "email", "phone"]
  for (const field of topLevelFields) {
    if ((original[field] ?? "") !== (current[field] ?? "")) return false
  }

  const addressFields = ["street", "city", "state", "postalCode", "country"]
  const origAddr = original.deliveryAddress ?? {}
  const currAddr = current.deliveryAddress ?? {}
  for (const field of addressFields) {
    if ((origAddr[field] ?? "") !== (currAddr[field] ?? "")) return false
  }

  return true
}
