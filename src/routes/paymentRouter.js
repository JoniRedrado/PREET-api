const { Router } = require('express');
const paymentRouter = Router();

const { createOrder, captureOrder, cancelPayment } = require('../handlers/paymentHandlers');

const {config} = require('dotenv');
config()

//Endpoints
paymentRouter.post('/create-order', createOrder)
paymentRouter.get('/capture-order', captureOrder)
paymentRouter.get('/cancel-order', cancelPayment)





module.exports = paymentRouter