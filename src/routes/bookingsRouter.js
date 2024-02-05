const { Router } = require("express");
const bookingsRouter = Router();
const { getBookingsHandler, postBookingsHandler } = require('../handlers/bookingsHandlers');

//Endpoints
bookingsRouter.get('/', getBookingsHandler);
bookingsRouter.post('/', postBookingsHandler);

module.exports = bookingsRouter