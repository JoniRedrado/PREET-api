const { User } = require('../../db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const validateCredentials = async (email, password, fireBaseAuth)=>{
    //Busca al usuario por email
    let user = await User.findOne({ where: { email } })
    //Mediante la libreria bcrypt, compara la contraseña ingresada por el contraseña hasheada de la base de datos
    const comparePasswords = !password && fireBaseAuth ? true : await bcrypt.compare(password, user.password);

    //Si las contraseñas coinciden, elimina la propiedad password y genera un jwt con la info del usuario y nuestra SECRET KEY
    if(comparePasswords) {
        if(!user && !password && fireBaseAuth){
            fireBaseAuth.password = '';
            user = await User.create(fireBaseAuth);
        }
        
        delete user.dataValues.password

        const token = jwt.sign(user.dataValues, SECRET_KEY, { expiresIn: '2h' })
        //Devuelve token y datos del usuario
        return {token, user: user.dataValues}
    } else {
        return {message: "Email or password incorrect."}
    }
}

module.exports = {
    validateCredentials
}