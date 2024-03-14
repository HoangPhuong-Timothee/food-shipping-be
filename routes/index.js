const router = require('express').Router()
const userRoutes = require('./user.route')
const baseURL = '/api/v1'

router.use(`${baseURL}/users`, userRoutes)

module.exports = router
