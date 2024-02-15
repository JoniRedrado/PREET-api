const { User } = require('../../db.js');
const { SECRET_KEY, SENDGRID_API_KEY} = process.env
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const welcomeEmail  = require('../utils/welcomeEmail.js')
const  {Op} = require ("sequelize");

const validateUser = async (email, password, fireBaseAuth)=>{
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
const getUsers = async () => {
    let users = await User.findAll();
    return users
  }
const getUserProfile = async (id) => {
    try {
        const user = await User.findByPk(id, {
            attributes: {exclude:["id", "password", "createdAt", "updatedAt", "deletedAt", "rol", "countryId", "profile_picture", "email"]}
        });
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const postUser = async (user) => {
  
  const {name, last_name, rol, email, password, birth_date, 
    gender, profile_picture, phone_number, nationality, countryId} = user
    //Mediante la libreria bcrypt, encripta la contraseña ingresada por el cliente
  const passwordHash = await bcrypt.hash(password, 10)
    //Se crea el usuario con la contraseña encriptada, se responde con la info del usuario sin la password
  const newUser = await User.create({name, last_name, rol, email, password: passwordHash,
    birth_date, gender, profile_picture, phone_number, nationality, countryId})
  delete newUser.password
  welcomeEmail(`${SENDGRID_API_KEY}`, email, name)
  return newUser
}
const putUserProfile = async (userId, updatedUserInfo) => {
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new Error('User not found.');
      }

      await user.update(updatedUserInfo);
  
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
  
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
const deleteUsers = async (id) => {
  const userToDelete = await User.findByPk(id);
  const deletedUser = await userToDelete.destroy()
  return deletedUser;
}
const getUsersDeleted = async (query) => {
  const { page = 1, 
      size = 20,
  } = query
const options = {
    limit: Number(size),
    offset: ( page - 1 ) * Number(size),
    paranoid: false,
    where: {deletedAt: { [Op.not]: null }},	
}
const { count, rows } = await User.findAndCountAll(options)
const deleteUsers = {
    total: count,
    users: rows
}
return deleteUsers
}
const restoreUser = async (email) => {
    const user = await User.findOne({ where: { email }, paranoid: false });
    const restoreU = await user.restore();
    return restoreU;
  };
  module.exports = {
    validateUser,
    getUsers,
    getUserProfile,
    postUser,
    putUserProfile,
    deleteUsers,
    getUsersDeleted,
    restoreUser
}