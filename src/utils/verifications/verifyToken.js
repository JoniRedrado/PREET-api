const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config()
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
    //Recibe por Headers el token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //Si no hay token
    if (!token) return res.status(403).send({ error: 'Error token' })
    //jwt verifica que el token sea válido usando la SECRET KEY, si no es valido responde con error. Si esta ok, continua con el flujo del endpoint
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).send({ error: 'Error token' })
        } 
        req.user = user
        next()
    })
}

module.exports = verifyToken