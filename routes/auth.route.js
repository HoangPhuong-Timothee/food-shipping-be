const router = require('express').Router()
const { signIn, logout, signUp } = require('../controllers/auth.controller')

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/logout', logout)

module.exports = router