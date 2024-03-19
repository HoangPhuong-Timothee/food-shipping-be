const router = require('express').Router()
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const storeRoutes = require('./store.route')
const categoryRoutes = require('./category.route')
const foodRoutes = require('./food.route')
const baseURL = '/api/v1'

router.use(`${baseURL}/users`, userRoutes)
router.use(`${baseURL}/auth`, authRoutes)
router.use(`${baseURL}/food-stores`, storeRoutes)
router.use(`${baseURL}/categories`, categoryRoutes)
router.use(`${baseURL}/foods`, foodRoutes)

module.exports = router
