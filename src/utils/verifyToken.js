const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);

    if (token === null) return res.status(401).send({ error: 'No token provided' })

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send({ error: 'Invalid token' })
        req.user = user
        next()
    })
}

module.exports = verifyToken