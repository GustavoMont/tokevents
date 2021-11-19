const express = require("express");

const app = express()

app.use(express.static('../frontend'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) =>{
    res.send('Certo chefe')
})

app.listen(8080, () =>{
    console.log('Server is runing')
})