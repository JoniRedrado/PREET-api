const { Router } = require('express');
const userRouter = Router();
const { loginHandler,
    getUsersHandler,
    getUserProfileHandler,
    postUserHandler,
    putUserProfileHandler,
    deleteUsersHandler,
    getUsersDeletedHandler,
    restoreUserHandler } = require('../handlers/usersHandlers');
const verifyToken = require('../utils/verifications/verifyToken');
const verifyAdmin = require('../utils/verifications/verifyAdmin');

//Endpoints
userRouter.post("/login", loginHandler)
userRouter.get('/', verifyToken, verifyAdmin, getUsersHandler)
userRouter.get('/profile', verifyToken, getUserProfileHandler);
userRouter.post("/register", postUserHandler) 
userRouter.put('/profile', verifyToken, putUserProfileHandler);
userRouter.delete('/:id', verifyToken, verifyAdmin, deleteUsersHandler)
userRouter.get("/deleted", verifyToken, verifyAdmin, getUsersDeletedHandler)
userRouter.get("/restore/:id", verifyToken, verifyAdmin, restoreUserHandler)

module.exports = userRouter