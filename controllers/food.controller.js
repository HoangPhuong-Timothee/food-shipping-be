const errorHandler = require('../utils/error')
const Food = require('../models/food.model')

const addNewFood = async (req, res, next) => {
    try {
        const newFood = new Food(req.body)
        await newFood.save()
        res.status(200).json(`Added ${req.body.title} successfully!`)
    } catch (error) {
        next(error)
    }
}

const getFoodById = async (req, res, next) => {
    const foodId = req.params.id
    try {
        const isExistedFood = await Food.findById(foodId)
        if (!isExistedFood) return next(errorHandler(404, "Food not found!"))
        res.status(200),json(isExistedFood)
    } catch (error) {
        next(error)
    }
}

const getFoodByFoodStore = async (req, res, next) => {

}

const updateFoodInfo = async (req, res, next) => {

}

const addNewFoodTags = async (req, res, next) => {

}

const availableFood = async (req, res, next) => {

}

const deleteFood = async (req, res, next) => {

}


module.exports = { addNewFood, deleteFood, updateFoodInfo, addNewFoodTags, availableFood, getFoodByFoodStore, getFoodById }  