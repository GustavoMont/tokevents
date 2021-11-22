const router = require('express').Router()
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)


router.get('/', (req, res) => {
    res.send({ login: true })
})


module.exports = router