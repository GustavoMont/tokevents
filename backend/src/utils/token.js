const jwt = require('jsonwebtoken')
require('dotenv/config')

const generateToken = (user_id) => jwt.sign({user_id}, process.env.TOKEN_KEY, {
        expiresIn: 60*60*8
    })



module.exports = {
    generateToken
}