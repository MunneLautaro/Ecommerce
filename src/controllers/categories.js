import Categorie from "../models/categorieModel"
import { connectToDatabaseUnix } from "../../connectDBUnix"
import { validateCategorie } from "@/helpers/validateCategorie"

const getItemsByCategorie = async (type) => {
  try {
    await connectToDatabaseUnix()
    const categories = await Categorie.find({
      type: type.trim().toLowerCase(),
    }).lean()
    return { success: "Items fetched", data: categories, status: 200 }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

const getItems = async () => {
  try {
    await connectToDatabaseUnix()
    const categories = await Categorie.find({})
    const plainCategories = JSON.parse(JSON.stringify(categories))
    return { success: "Items fetched", data: plainCategories, status: 200 }
  } catch (error) {
    return { error: error?.message, status: 500 }
  }
}

const addItemInCategorie = async (type, value) => {
  try {
    const validationError = validateCategorie(type, value)
    if (validationError) {
      return validationError
    }

    await connectToDatabaseUnix()

    const existing = await Categorie.findOne({
      type: type.trim().toLowerCase(),
      value: value.trim().toLowerCase(),
    }).lean()

    if (existing) {
      return {
        error: `The ${type} with value "${value}" already exists`,
        status: 400,
      }
    }

    const newItem = await Categorie.create({
      type: type.trim().toLowerCase(),
      value: value.trim().toLowerCase(),
    })

    return {
      success: "Item added successfully",
      data: {
        type: newItem.type,
        value: newItem.value,
        _id: newItem._id.toString(),
        createdAt: newItem.createdAt.toISOString(),
        updatedAt: newItem.updatedAt.toISOString(),
      },
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
    const validationError = validateCategorie(type, value)
    if (validationError) {
      return validationError
    }

    await connectToDatabaseUnix()

    const categorie = await Categorie.findOneAndDelete({
      type: type.trim().toLowerCase(),
      value: value.trim().toLowerCase(),
    }).lean()

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
    const validationError = validateCategorie(type, newValue)
    if (validationError) {
      return validationError
    }

    if (!oldValue || oldValue.trim() === "") {
      return { error: "Old value is required", status: 400 }
    }

    await connectToDatabaseUnix()

    const existing = await Categorie.findOne({
      type: type.trim().toLowerCase(),
      value: oldValue.trim().toLowerCase(),
    }).lean()
    if (!existing) {
      return {
        error: `The ${type} with value "${oldValue}" does not exist`,
        status: 404,
      }
    }

    const duplicate = await Categorie.findOne({
      type: type.trim().toLowerCase(),
      value: newValue.trim().toLowerCase(),
      _id: { $ne: existing._id },
    }).lean()

    if (duplicate) {
      return {
        error: `The ${type} with value "${newValue}" already exists`,
        status: 400,
      }
    }

    const updatedCategorie = await Categorie.findOneAndUpdate(
      { type: type.trim().toLowerCase(), value: oldValue.trim().toLowerCase() },
      { value: newValue.trim().toLowerCase() },
      { new: true }
    ).lean()

    return {
      success: "Item updated successfully",
      message: `Category updated from "${oldValue}" to "${newValue}"`,
      data: updatedCategorie,
      status: 200,
    }
  } catch (error) {
    return { error: error.message, status: 500 }
  }
}

export {
  addItemInCategorie,
  deleteCategorie,
  modifyCategorie,
  getItemsByCategorie,
  getItems,
}
