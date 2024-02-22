const { SECRET_KEY} = process.env;
const jwt = require('jsonwebtoken');

const socketAuth = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifica y decodifica el token
        return decoded.id;
    } catch (err) {
        return false;
    }
}

module.exports = socketAuth;