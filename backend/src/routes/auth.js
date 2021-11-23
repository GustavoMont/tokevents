const express = require('express')
const User = require('../models/User')
const argon2 = require('argon2')
const { generateToken } = require('../utils/token')


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Autenticar')
})


router.post('/login', async (req, res) => {
    const { login, password } = req.body

    try {
        const user = await User.findOne({ $or: [{ "user_name": login }, { "email": login }] }, { "email": 1, "user_name": 1, "nome": 1 }).select('+password')
        if (!user) {
            res.status(400).json({erro:true, message: "Usuário não cadastrado" })
            return
        }
        if (! await argon2.verify(user.password, password)) {
            res.status(400).json({erro: true, message: "Senha incorreta" })
            return
        }
        user.password = undefined
        const { nome, user_name, id } = user
        res.status(200).json({ token: generateToken(nome, user_name, id) })
    } catch (error) {
        res.status(400).json({erro:true, message: error })
    }


})

router.post('/signIn', async (req, res) => {
    try {
        const body = req.body

        const hash = await argon2.hash(body.password)
        const user = new User({
            ...req.body,
            password: hash
        })
        const usuario = await User.findOne({$or:[{"email": body.email}, {'user_name': body.user_name}]})
        if (usuario) {
            res.status(400).json({erro: true, message: "Usuário já cadastrado" })
            return
        }
        user.save()
            .then(data => {
                user.password = undefined
                const { user_name, nome, id } = user
                res.status(201).json({ token: generateToken(user_name, nome, id)})
            }).catch(err => { res.status(400).json({erro: true, message: err }) })
    } catch (error) {
        res.status(500).json({erro: true, message: error.message})
    }
})

module.exports = router