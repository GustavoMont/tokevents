const jwt = require('jsonwebtoken')
require('dotenv/config')

const generateToken = (nome, user_name, user_id) => jwt.sign({nome, user_name, user_id}, process.env.TOKEN_KEY, {
        expiresIn: 60*60*8
    })



module.exports = {
    generateToken
}