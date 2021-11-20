const express = require("express");
const mongoose = require('mongoose');
require('dotenv/config')

const authRoute = require('./routes/auth')
const homeRoute = require('./routes/home')
const app = express()

app.use(express.static( __dirname + '/public' ))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const pathsHtml = `
<h1>Certo Chefe</h1>
<a href="/cadastro">Cadastro</a>
`
try {
    mongoose.connect(process.env.DATA_BASE_CONNECTION, { useNewUrlParser: true }, () =>{
        console.log('Conectado')
    })
} catch (error) {
    console.log(error.message)
}


app.get('/', (req, res) =>{
    res.send(pathsHtml)
})

app.use('/auth', authRoute)
app.use('/home', homeRoute)


app.listen(8080, () =>{
    console.log('Server is runing')
})