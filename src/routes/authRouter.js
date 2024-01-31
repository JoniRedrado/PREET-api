const { Router } = require('express');
const { registerHandler, loginHandler } = require('../handlers/authHandlers');
const authRouter = Router()

//Endpoints
authRouter.post('/register', registerHandler)

authRouter.post('/login', loginHandler)

module.exports = authRouter