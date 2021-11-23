const router = require('express').Router()
const authMiddleware = require('../middleware/auth')
const Event = require('../models/Events')
const jwt = require('jsonwebtoken')


router.use(authMiddleware)

router.post('/agendar', async (req, res) => {
    try {
        const body = req.body
        const { data_inicio, data_fim } = body
        const { user_id } = jwt.decode(body.user_id)
        const find = await Event.findOne({$and:[{data_inicio: {$gte: new Date(data_inicio)}}, {user_id}]   })
        if ((new Date(data_inicio) < new Date()) || new Date(data_fim) < new Date()) {
            res.status(400).json({ erro: true, field:'data_inicio' ,message: "A data não pode ser anterior ao dia de Hoje" })
            return
        }
        if (data_fim) {
            if (new Date(data_inicio) > new Date(data_fim)) {
                res.status(400).json({ erro: true, field: 'data_inicio' ,message: "A Data de Início não pode sre maior que a data do término" })
            }
        }
        if (find) {
            res.status(400).json({ erro: true, field: 'header' ,message: "Evento já cadastrado" })
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
    } catch (error) {
        res.status(500).json({ erro: true, message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const {id} = jwt.decode(req.body.id)
        const events = await Event.find({id}, {user_id: 0})
        ;
        res.status(200).json({events})

    } catch (error) {
        res.status(500).json({ error
         })
    }
})

module.exports = router