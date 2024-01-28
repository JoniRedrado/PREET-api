const { User } = require('../../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } })
    const comparePasswords = await bcrypt.compare(password, user.password)

    if(comparePasswords) {
        delete user.dataValues.password
        const token = jwt.sign(user.dataValues, SECRET_KEY, { expiresIn: '2h' })

        res.status(200).send(token)
    } else {

        res.status(500).send({message: "Email or password incorrect."})
    }
}

const registerHandler = async (req, res) => {
    const { name, last_name, email, password } = req.body;
    //Passwrod Hash
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    try {
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