const jwt = require('jsonwebtoken')
require('dotenv/config')


module.exports = (req, res, next) => {
    const authHeader = req.headers.auth


    if (!authHeader)
        return res.status(401).send({ err: "Sem tolken", login: false });

    const parts = authHeader.split(' ')

    if (!parts.length == 2)
        return res.status(401).send({ err: "Erro no Token", login: false });

    const [schema, token] = parts

    if (!/^Bearer/i.test(schema))
        return res.status(401).send({ err: "Token Mal Formatado", login:false });

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ err: "Token Inválido", login: false });
        }
        req.userId = decoded.id
        return next();
    })

}