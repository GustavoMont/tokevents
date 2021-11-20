const express = require('express')
const User = require('../models/User')
const argon2 = require('argon2')
const { generateToken } = require('../utils/token')


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Autenticar')
})


router.post('/login', async (req, res) =>{
    const { login, senha } = req.body

    const user = await User.findOne({$or: [{"user_name": login}, {"email": login}]}, {"email": 1, "user_name": 1, "nome": 1}).select('+password')

    if (!user) {
        res.status(400).json({message: "Usuário não cadastrado"})
        return
    }
    if (! await argon2.verify(user.password, senha)) {
        res.status(400).json({message: "Senha incorreta"})
        return
    }
    user.password = undefined
    res.status(200).json({user, token: generateToken(user.id)})
})

router.post('/signIn', async (req, res) => {
    const body = req.body
    
    const hash = await argon2.hash(body.password)
    const user = new User({
        ...req.body,
        password: hash
    })
    req.body.password = undefined
    if ((await User.findOne({"email": body.email}))) {
        res.status(400).json({message: "Usuário já cadastrado"})
        return
    } 

    user.save()
    .then(data => {
        user.password = undefined
        res.status(201).json({ user, token: generateToken(user.id) })
        
    })
    .catch(err => {res.status(400).json({message: err})})


})

module.exports = router