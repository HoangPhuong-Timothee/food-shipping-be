const router = require('express').Router()
const { authorizeAdmin, authorizeVendor } = require('../utils/verifyUser')
const { getFoodById, getFoodByFoodStore, addNewFood, addNewFoodTags, deleteFood, availableFood, updateFoodInfo } = require('../controllers/food.controller')

router.get('/food/:id', getFoodById)
router.get('/food/:store', getFoodByFoodStore)
router.post('/', addNewFood)
router.patch('/update/:id', updateFoodInfo)
router.post('/new-tags', addNewFoodTags)
router.patch('/update/:id', availableFood)
router.delete('/delete/:id', deleteFood)

module.exports = router