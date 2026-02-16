import { VALID_CATEGORIES } from "../utils/validCategories"

const validateCategorie = (type, value) => {
  if (!type || type.trim() === "") {
    return { error: "Type is required", status: 400 }
  }

  if (!value || value.trim() === "") {
    return { error: "Value is required", status: 400 }
  }
  if (!VALID_CATEGORIES.some((cat) => cat.value === type)) {
    return {
      error: `Invalid type: ${type}. Valid types are: ${VALID_CATEGORIES.map(
        (cat) => cat.value,
      ).join(", ")}`,
      status: 400,
    }
  }

  return null
}

export { validateCategorie }
