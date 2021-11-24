const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    data_inicio:{
        type: Date,
        required: true
    },
    data_fim:{
        type: Date
    },
    complete:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Event = mongoose.model('Event',EventSchema)

module.exports = Event