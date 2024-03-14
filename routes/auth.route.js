const router = require('express').Router()
const { register, login, logout, facebook, google } = require('../controllers/auth.controller')

router.get('/', (req, res) => {
    res.send("This is authencation route...")
})

router.post('/register', register)
router.post('/login', login)
router.post('/facebook-login', facebook)
router.post('/google-login', google)
router.post('/logout', logout)

module.exports = router