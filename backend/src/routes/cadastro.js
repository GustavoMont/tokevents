const express = require('express')
const User = require('../models/User')
const argon2 = require('argon2')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Cadastre-se')
})


router.post('/', async (req, res) => {
    const body = req.body
    
    const hash = await argon2.hash(body.password)
    const user = new User({
        ...req.body,
        password: hash
    })

    user.save()
    .then(data => res.status(201).json({message: "Cadastro realizado com sucesso"}) )
    .catch(err => res.status(400).json({message: err}) )


})

module.exports = router