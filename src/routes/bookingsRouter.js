const { Router } = require("express");
const bookingsRouter = Router();
const { getBookingsHandler,
    getBookingsUserHandler,
    getBookingUserLastHandler, 
    getBookingIdHandler, 
    postBookingsHandler, 
    putBookingsHandler,
    deleteBookingHandler,
    getBookingsDeletedHandler, 
    restoreBookingHandler} = require('../handlers/bookingsHandlers');
const verifyToken = require('../utils/verifications/verifyToken');
const {validatePostBooking, validatePutBooking} = require("../utils/validations/validateBooking")

//Endpoints
bookingsRouter.get('/', getBookingsHandler);
bookingsRouter.get('/user', verifyToken, getBookingsUserHandler);
bookingsRouter.get('/last', verifyToken, getBookingUserLastHandler);
bookingsRouter.get('/by/:id', verifyToken, getBookingIdHandler);
bookingsRouter.post('/:id', verifyToken, validatePostBooking, postBookingsHandler);
bookingsRouter.put('/update/:id', verifyToken, validatePutBooking, putBookingsHandler);
bookingsRouter.delete('/:id', verifyToken, deleteBookingHandler);
bookingsRouter.get('/deleted', verifyToken, getBookingsDeletedHandler);
bookingsRouter.put('/restore/:id', verifyToken, restoreBookingHandler);

module.exports = bookingsRouter