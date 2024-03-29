const { User } = require('../../db.js');
const bcrypt = require('bcrypt');
const { validateCredentials } = require('../controllers/authControllers.js')

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const login = await validateCredentials(email, password)
        if (login){
            res.status(200).json({token: login.token, user: login.user})
        } else {
            res.status(500).send({message: "Email or password incorrect."})
        }
    } catch (error) {
        res.status(400).send ("User not found")
    }
}

const registerHandler = async (req, res) => {
    const { name, last_name, email, password } = req.body;
    //Mediante la libreria bcrypt, encripta la contraseña ingresada por el cliente
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        //Se crea el usuario con la contraseña encriptada, se responde con la info del usuario sin la password
        const user = await User.create({ name, last_name, email, password: passwordHash });
        delete user.password
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    loginHandler,
    registerHandler
}