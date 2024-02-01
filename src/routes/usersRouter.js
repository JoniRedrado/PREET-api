const { Router } = require('express');
const userRouter = Router();
const { getUsersHandler, deleteUsersHandler } = require('../handlers/usersHandlers');

//Endpoints
userRouter.get('/', getUsersHandler)

userRouter.delete('/delete/:id', deleteUsersHandler)

module.exports = userRouter