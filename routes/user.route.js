const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("Get all users...")
})

router.get('/user/:id', async (req, res) => {
    res.send(`Get user with id: ${req.params.id}...`)
})

module.exports = router