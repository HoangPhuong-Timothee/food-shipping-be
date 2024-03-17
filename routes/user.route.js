const router = require('express').Router()
const { authorizeUser } = require('../utils/verifyUser')
const { getUserInfo, deleteAccount, updateUserInfo } = require('../controllers/user.controller')

router.get('/user/:id', authorizeUser, getUserInfo)
router.put('/update/:id', authorizeUser, updateUserInfo)
router.delete('/delete/:id', authorizeUser, deleteAccount)

module.exports = router