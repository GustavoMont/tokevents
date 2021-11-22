const Event = require('../models/Events')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.post('/agendar', async (req, res) => {
    try {
        const body = req.body
        const { data_inicio, data_fim } = body
        const { user_id } = jwt.decode(body.user_id)
        const find = await Event.findOne({data_inicio: {$gte: new Date(data_inicio)}})
        
        if ((new Date(data_inicio) < new Date()) || new Date(data_fim) < new Date()) {
            res.status(400).json({ erro: true, message: "A data não pode ser anterior ao dia de Hoje" })
            return
        }
        if (find) {
            res.status(400).json({ erro: true, message: "Evento já cadastrado" })
            return
        }

        const event = new Event({
            ...body,
            user_id
        })

        event.save()
        .then(data => {
            res.status(201).json({message: "Evento Cadastrado com Sucesso"})}
        )
        .catch(erro => res.status(400).json(err))
        // res.send("MERDA")
    } catch (error) {
        res.status(500).json({ erro: true, message: error.message })
    }
})

router.post('/events', async (req, res) => {
    try {
        const {user_id} = jwt.decode(req.body.user_id)
        const events = await Event.find({user_id}, {user_id: 0})

        res.status(200).json({events})

    } catch (error) {
        res.status(500).json({ error
         })
    }
})

router.get('/', (req, res) => {
    res.send({ ok: true })
})


module.exports = router