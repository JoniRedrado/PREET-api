const verifyToken = require('../utils/verifications/verifyToken');
const { Router } = require("express");
const userRouter = Router();

userRouter.get('/', verifyToken, (req, res) => {
    res.status(200).json({message: 'Token ok'});
})

module.exports = userRouter;