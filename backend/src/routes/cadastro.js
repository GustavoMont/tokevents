const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    res.send('Cadastre-se')
})


router.post('/', (req, res) =>{
    
    res.send("Chegou")
})

module.exports = router 