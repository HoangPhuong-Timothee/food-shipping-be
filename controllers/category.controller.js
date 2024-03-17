const Category = require('../models/category.model')
const errorHandler = require('../utils/errorHandler')

const createNewCategory = async (req, res, next) => {
    const newCategory = new Category(req.body)
    try {
        await newCategory.save()
        res.status(201).json(newCategory)
    } catch (error) { 
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    const categoryId = req.params.id
    const { title, value, imageUrl } = req.body
    try {
        const isExistedCategory = await Category.findById(categoryId)
        if (!categoryId) return next(errorHandler(404, "Category not found!"))
        const newCategory = await Category.findByIdAndUpdate(categoryId, {
            $set: {
                title: title,
                value: value,
                imageUrl: imageUrl
            }
        }, { new: true })
        res.status(201).json({
            message: "Update successfull!",
            data: newCategory
        })
    } catch (error) {
        next(error)
    }
}

const getAllCategories = async (req, res, next) => {

}

const deleteCategory = async (req, res, next) => {
    const categoryId = req.params.id
    try {
        const isExistedCategory = await Category.findById(categoryId)
        if (!categoryId) return next(errorHandler(404, "Category not found!"))
        await Category.findByIdAndDelete(categoryId)
        res.status(200).json("Delete category successfull!")
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllCategories, createNewCategory, deleteCategory, updateCategory }