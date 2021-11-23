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
        const find = await Event.findOne({$and:[{data_inicio: new Date(data_inicio)}, {user_id}]})
        if ((new Date(data_inicio) < new Date()) || new Date(data_fim) < new Date()) {
            res.status(400).json({ erro: true, field:'data_inicio' ,message: "A data não pode ser anterior ao dia de Hoje" })
            return
        }
        if (data_fim) {
            if (new Date(data_inicio) > new Date(data_fim)) {
                res.status(400).json({ erro: true, field: 'data_inicio' ,message: "A Data de Início não pode sre maior que a data do término" })
                return
            }
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

router.delete('/remove', async(req, res) =>{
    try {
        let { id, user_id } = req.body
        user_id = jwt.decode(user_id).user_id
        const event = await Event.findOne({$and:[{_id: id}, {user_id}]})
        if (!event) {
            res.status(401).json({erro: true, message: 'Ação não autorizada'})
            return
        }
        Event.findOneAndDelete({_id: id}, (err, doc)=>{
            if (err) {
                res.status(400).json({erro: true, message: err.message})
                return
            }
            res.status(200).json({message: "Evento deletado com sucesso"})
        })
    } catch (error) {
        res.status(500).json({erro: true, message: error.message})
    }
    


})

router.put('/update', async (req, res) =>{
    try {        
        let {id, user_id, ...fields} = req.body

        user_id = jwt.decode(user_id).user_id

        const event = await Event.findOne({$and:[{id}, {user_id}]})

        if (!event) {
            res.status(401).json({erro: true, message: 'Alteração não autorizada'})
            return
        }
        Event.findByIdAndUpdate({_id: id}, {...fields}, (err, doc) =>{
            if (err) {
                res.status(400).json({erro: true, message: err.message})
                return
            }
            doc.user_id = undefined
            res.status(200).json({doc})
        })
    } catch (error) {
        res.status(500).json({erro: true, message: error.message})   
    }
})


module.exports = router