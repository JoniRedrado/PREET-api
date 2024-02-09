const { Router } = require('express');
const userRouter = Router();
const { getUsersHandler, deleteUsersHandler, getUserProfileHandler, updateUserProfileHandler } = require('../handlers/usersHandlers');
const verifyToken = require('../utils/verifyToken');
const verifyAdmin = require('../utils/verifyAdmin');

//Endpoints
userRouter.get('/', verifyToken, verifyAdmin, getUsersHandler)

userRouter.delete('/delete/:id', verifyToken, verifyAdmin, deleteUsersHandler)

userRouter.get('/profile', verifyToken, getUserProfileHandler);
userRouter.put('/profile', verifyToken, updateUserProfileHandler);


module.exports = userRouter