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
const verifyToken = require('../utils/verifyToken');

//Endpoints
bookingsRouter.get('/', getBookingsHandler);
bookingsRouter.get('/user', verifyToken, getBookingsUserHandler);
bookingsRouter.get('/last', verifyToken, getBookingUserLastHandler);
bookingsRouter.get('/by/:id', verifyToken, getBookingIdHandler);
bookingsRouter.post('/:id', verifyToken, postBookingsHandler);
bookingsRouter.put('/update/:id', verifyToken, putBookingsHandler);
bookingsRouter.delete('/:id', verifyToken, deleteBookingHandler);
bookingsRouter.get('/deleted', verifyToken, getBookingsDeletedHandler);
bookingsRouter.put('/restore', verifyToken, restoreBookingHandler);

module.exports = bookingsRouter