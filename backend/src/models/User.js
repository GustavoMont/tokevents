const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    user_name:{
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true,
        select: false
    },
    reports:[
        {
            description: String,
            data_report: Date,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;