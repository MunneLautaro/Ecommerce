import Categorie from "../models/categorieModel"
import { connectToDatabaseUnix } from "../../connectDBUnix"
import { validateCategorie } from "@/helpers/validateCategorie"

const getItemsByType = async (type) => {
  try {
    await connectToDatabaseUnix()
    const categories = await Categorie.find({
      type: type.trim().toLowerCase(),
    })
    const plainCategories = JSON.parse(JSON.stringify(categories))
    return { success: "Items fetched", data: plainCategories, status: 200 }
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
      message: `Category added with type: ${type} and value: ${value}`,
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
    })

    if (!categorie) {
      return { error: "The categorie does not exist", status: 404 }
    }

    const plainCategorie = JSON.parse(JSON.stringify(categorie))

    return {
      success: `Item deleted successfully`,
      message: `Category deleted with type: ${type} and value: ${value}`,
      data: plainCategorie,
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
    })
    if (!existing) {
      return {
        error: `The ${type} with value "${oldValue}" does not exist`,
        status: 404,
      }
    }

    const duplicate = await Categorie.findOne({
      type: type.trim().toLowerCase(),
      value: newValue.trim().toLowerCase(),
    })

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
    )
    const plainUpdatedCategorie = JSON.parse(JSON.stringify(updatedCategorie))

    return {
      success: "Item updated successfully",
      message: `Category updated from "${oldValue}" to "${newValue}"`,
      data: plainUpdatedCategorie,
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
  getItemsByType,
  getItems,
}
