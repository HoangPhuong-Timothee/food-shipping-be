const router = require('express').Router()
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const baseURL = '/api/v1'

router.use(`${baseURL}/users`, userRoutes)
router.use(`${baseURL}/auth`, authRoutes)

module.exports = router
