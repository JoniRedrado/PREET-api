const { Router } = require("express");
const bookingsRouter = Router();
const { getBookingsHandler,
    getBookingsUserHandler, 
    getBookingIdHandler, 
    postBookingsHandler, 
    putBookingsHandler,
    deleteBookingHandler,
    getBookingsDeletedHandler, 
    restoreBookingHandler} = require('../handlers/bookingsHandlers');

//Endpoints
bookingsRouter.get('/', getBookingsHandler);
bookingsRouter.get('/user/:id', getBookingsUserHandler);
bookingsRouter.get('/by/:id', getBookingIdHandler);
bookingsRouter.post('/', postBookingsHandler);
bookingsRouter.put('/update/:id', putBookingsHandler);
bookingsRouter.delete('/:id', deleteBookingHandler);
bookingsRouter.get('/deleted', getBookingsDeletedHandler);
bookingsRouter.put('/restore', restoreBookingHandler);

module.exports = bookingsRouter