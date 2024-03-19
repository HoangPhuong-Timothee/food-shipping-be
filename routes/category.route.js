const router = require('express').Router()
const { getAllCategories, getRandomCategory, createNewCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')
const { authorizeAdmin } = require('../utils/verifyUser')

//For all users
router.get('/', getAllCategories)
router.get('/random', getRandomCategory)

//For admin
router.post('/', authorizeAdmin, createNewCategory)
router.patch('/update/:id', authorizeAdmin, updateCategory)
router.delete('/delete/:id', authorizeAdmin, deleteCategory)

module.exports = router