const FoodStore = require('../models/store.model')
const errorHandler = require('../utils/error')

const getFoodStoreInfo = async (req, res, next) => {
    const foodStoreId = req.params.id
    try {
        const isExistedFoodStore = await FoodStore.findById(foodStoreId)
        if (!isExistedFoodStore) return next(errorHandler(404, "Food store not found!"))
        res.status(200).json(isExistedFoodStore)
    } catch (error) { 
        next(error)
    }
}

const getRandomFoodStore = async (req, res, next) => {
    let rndStore = []
    
    try {
        if (req.params.code) {
            rndStore = await FoodStore.aggregate([
                { $match: { code: req.params.code } },
                { $sample: { size: 5 } },
                { $project: { v: __0 } }
            ])
        }
        if (!rndStore.length) {
            rndStore = await FoodStore.aggregate([
                { $sample: { size: 5 } },
                { $project: { v: __0 } }
            ])
        }
        if (rndStore.length) {
            res.status(200).json(rndStore)
        }
    } catch (error) {
        next(error)
    }
}

const createNewFoodStore = async (req, res, next) => {
    const newFoodStore = new FoodStore(req.body)
    try {
        await newFoodStore.save()
        res.status(201).json({
            message: `Create food store ${req.body.title} successfully!`,
            data: newFoodStore
        })
    } catch (error) { 
        next(error)
    }
}

const updateFoodStoreInfo = async (req, res, next) => {
    const foodStoreId = req.params.id
    try {
        const isExistedFoodStore = await FoodStore.findById(foodStoreId)
        if (!isExistedFoodStore) return next(errorHandler(404, "Food store not found!"))
        const updatedInfo = await FoodStore.findByIdAndUpdate(foodStoreId, {
            $set: req.body,    
        }, 
        { 
            new: true
        })
        res.status(201).json({ 
            message: `Update food store ${req.body.title} successfully!`,
            data: updatedInfo
        })
    } catch (error) { 
        next(error)
    }
}

const availableFoodStore = async (req, res, next) => {
    const foodStoreId = req.params.id
    try {
        const isExistedFoodStore = await FoodStore.findById(foodStoreId)
        if (!isExistedFoodStore) return next(errorHandler(404, "Food store not found!"))
        isExistedFoodStore.isAvailable = !isExistedFoodStore.isAvailable
        isExistedFoodStore.save()
        res.status(200).json({
            message: "Food store is available!",
            isAvailable: isExistedFoodStore.isAvailable
        })
    } catch (error) {
        next(error)
    }
}

const deleteFoodStore = async (req, res, next) => {
    const foodStoreId = req.params.id
    try {
        const isExistedFoodStore = await FoodStore.findById(foodStoreId)
        if (!isExistedFoodStore) return next(errorHandler(404, "Food store not found!"))
        await FoodStore.findByIdAndDelete(foodStoreId)
    res.status(200).json("Deleted food store successfully!")
    } catch (error) {
        next(error)
    }
}

module.exports = { getFoodStoreInfo, createNewFoodStore, deleteFoodStore, getRandomFoodStore, availableFoodStore, updateFoodStoreInfo }