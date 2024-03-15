const router = require('express').Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)


module.exports = router