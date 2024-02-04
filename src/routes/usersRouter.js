const { Router } = require('express');
const userRouter = Router();
const { getUsersHandler, deleteUsersHandler, getUserProfileHandler, updateUserProfileHandler } = require('../handlers/usersHandlers');
const verifyToken = require('../utils/verifyToken');

//Endpoints
userRouter.get('/', getUsersHandler)

userRouter.delete('/delete/:id', deleteUsersHandler)

userRouter.get('/profile', verifyToken, getUserProfileHandler);
userRouter.put('/profile', verifyToken, updateUserProfileHandler);


module.exports = userRouter