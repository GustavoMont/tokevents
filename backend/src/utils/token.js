const jwt = require('jsonwebtoken')
require('dotenv/config')

const generateToken = (id) => jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: 60*60*8
    })



module.exports = {
    generateToken
}