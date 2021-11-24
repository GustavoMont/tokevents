const router = require('express').Router()
const authMiddleware = require('../middleware/auth')
const Event = require('../models/Events')
const { isInvalidDates } = require('../utils/handleDates')
const jwt = require('jsonwebtoken')


router.use(authMiddleware)

router.post('/agendar', async (req, res) => {
    try {
        const body = req.body
        const { data_inicio, data_fim } = body
        const { user_id } = jwt.decode(body.user_id)
        const find = await Event.findOne({$and:[{data_inicio: new Date(data_inicio)}, {user_id}]})
        
        if (isInvalidDates(data_inicio, data_fim, res)) {
            return
        }

        if (find) {
            res.status(400).json({ erro: true, field: 'header', message: "Evento já cadastrado" })
            return
        }
        const event = new Event({
            ...body,
            data_inicio,
            data_fim,
            user_id
        })
        event.save()
        .then(data => {
            event.user_id = undefined
            res.status(201).json(event)}
        )
        .catch(err => res.status(400).json(err))
    } catch (error) {
        res.status(500).json({ erro: true, message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { user_id } = jwt.decode(req.body.user_id)
        const events = await Event.find({user_id}, {user_id: 0});
        res.status(200).json({events})

    } catch (error) {
        res.status(500).json({ error
         })
    }
})

router.delete('/remove', async (req, res) =>{
    try {
        let { id, user_id } = req.body
        user_id = jwt.decode(user_id).user_id
        const event = await Event.findOneAndDelete({_id: id, user_id})
        if (!event) {
            res.status(401).json({erro: true, message: 'Ação não autorizada'})
            return
        }
        res.status(200).json({message: "Evento excluído com sucesso", evento: event})
    } catch (error) {
        res.status(500).json({erro: true, message: error.message})
    }
})

router.put('/update', async (req, res) =>{
    try {        
        let {id, user_id, data_inicio, data_fim ,...fields} = req.body
        user_id = jwt.decode(user_id).user_id
        if (isInvalidDates(data_inicio, data_fim, res)) {
            return
        }

        const event = await Event.findOneAndUpdate({'_id': id  ,user_id}, {...fields, data_inicio, data_fim})
        if (!event) {
            res.status(401).json({erro: true, message: 'Alteração não autorizada'})
            return
        }
        const eventUpdated = await Event.findOne({'_id': id  ,user_id})
        res.status(200).json(eventUpdated)

    } catch (error) {
        res.status(500).json({erro: true, message: error.message})   
    }
})

router.put('/concluir', async (req, res) =>{
    try {
        let { id, user_id } = req.body
        user_id = jwt.decode(user_id).user_id
        
        
        const event = await Event.findOneAndUpdate({'_id': id  ,user_id}, {complete: true})
        if (!event) {
            res.status(401).json({erro: true, message: 'Alteração não autorizada'})
            return
        }    
        const eventUpdated = await Event.findOne({'_id': id  ,user_id})
        res.status(200).json(eventUpdated)
    } catch (error) {
        res.status(500).json({erro: true, message: error.message})   
    }
})


module.exports = router