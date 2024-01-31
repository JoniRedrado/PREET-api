const { Router } = require('express');
const userRouter = Router();
const { getUsersHandler } = require('../handlers/usersHandlers');

//Endpoints
userRouter.get('/', getUsersHandler)

module.exports = userRouter