const router = require('express').Router()
const { getFoodStoreInfo, createNewFoodStore, deleteFoodStore, getRandomFoodStore, updateFoodStoreInfo, availableFoodStore } = require('../controllers/store.controller')
const { authorizeUser, authorizeVendor } = require('../utils/verifyUser')

//For all users
router.get('/store/:id', getFoodStoreInfo)
router.get('/:code', getRandomFoodStore)

//For registered users
router.post('/', authorizeUser, createNewFoodStore)

//For admins and vendors
router.patch('/update/:id', authorizeVendor, updateFoodStoreInfo)
router.patch('/update/:id', authorizeVendor, availableFoodStore)
router.delete('/:id', authorizeVendor, deleteFoodStore)

module.exports = router