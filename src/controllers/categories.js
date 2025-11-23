import Categorie from "../models/categorieModel"
import { connectToDatabaseUnix } from "../../connectDBUnix"

const VALID_TYPES = ["brand", "color", "productName", "model"]

const validateCategorieInput = (type, value) => {
  if (!type || type.trim() === "") {
    return { error: "Type is required", status: 400 }
  }

  if (!value || value.trim() === "") {
    return { error: "Value is required", status: 400 }
  }

  if (!VALID_TYPES.includes(type)) {
    return {
      error: `Invalid type: ${type}. Valid types are: ${VALID_TYPES.join(
        ", "
      )}`,
      status: 400,
    }
  }

  return null
}

const getIdFromCategorie = async (type, value) => {
  try {
    const validationError = validateCategorieInput(type, value)
    if (validationError) {
      return validationError
    }
    await connectToDatabaseUnix()
    const categorie = await Categorie.findOne({
      type: type.trim(),
      value: value.trim(),
    })
    if (!categorie) {
      return { error: "Categorie not found", status: 404 }
    }
    return categorie._id
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const createCategorie = async (type, value) => {
  try {
    const validationError = validateCategorieInput(type, value)
    if (validationError) {
      return validationError
    }

    await connectToDatabaseUnix()

    const existing = await Categorie.findOne({
      type: type.trim(),
      value: value.trim(),
    })

    if (existing) {
      return {
        error: `The ${type} with value "${value}" already exists`,
        status: 400,
      }
    }

    const newCategorie = new Categorie({
      type: type.trim(),
      value: value.trim(),
    })
    await newCategorie.save()

    return {
      success: true,
      data: newCategorie,
      status: 201,
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return {
        error: Object.values(error.errors)
          .map((e) => e.message)
          .join(", "),
        status: 400,
      }
    }

    return { error: error.message, status: 500 }
  }
}

const deleteCategorie = async (type, value) => {
  try {
    const validationError = validateCategorieInput(type, value)
    if (validationError) {
      return validationError
    }

    await connectToDatabaseUnix()

    const categorie = await Categorie.findOneAndDelete({
      type: type.trim(),
      value: value.trim(),
    })

    if (!categorie) {
      return { error: "The categorie does not exist", status: 404 }
    }

    return {
      success: `The categorie with type: ${type} and value: ${value} was successfully deleted`,
      data: categorie,
      status: 200,
    }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const modifyCategorie = async (type, oldValue, newValue) => {
  try {
    const validationError = validateCategorieInput(type, newValue)
    if (validationError) {
      return validationError
    }

    if (!oldValue || oldValue.trim() === "") {
      return { error: "Old value is required", status: 400 }
    }

    await connectToDatabaseUnix()

    const existing = await Categorie.findOne({
      type: type.trim(),
      value: oldValue.trim(),
    })

    if (!existing) {
      return {
        error: `The ${type} with value "${oldValue}" does not exist`,
        status: 404,
      }
    }

    const duplicate = await Categorie.findOne({
      type: type.trim(),
      value: newValue.trim(),
      _id: { $ne: existing._id },
    })

    if (duplicate) {
      return {
        error: `The ${type} with value "${newValue}" already exists`,
        status: 400,
      }
    }

    const updatedCategorie = await Categorie.findOneAndUpdate(
      { type: type.trim(), value: oldValue.trim() },
      { value: newValue.trim() },
      { new: true }
    )

    return {
      success: true,
      message: `Category updated from "${oldValue}" to "${newValue}"`,
      data: updatedCategorie,
      status: 200,
    }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

export {
  getIdFromCategorie,
  createCategorie,
  deleteCategorie,
  modifyCategorie,
  VALID_TYPES,
}
