const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("This is users route...")
})

module.exports = router