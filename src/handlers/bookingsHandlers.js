const { getBookings,
    getBookingsUser,
    getBookingById, 
    postBooking, 
    putBooking,
    deleteBooking,
    getBookingsDeleted,
    restoreBooking } = require('../controllers/bookingsControllers');

const getBookingsHandler = async (req, res) => {
    try{
        const bookings = await getBookings( req.query );
        res.status(200).json(bookings);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const getBookingsUserHandler = async (req, res) => {
    const { id } = req.params;
    try{
        const bookings = await getBookingsUser(id, req.query);
        res.status(200).json(bookings);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const getBookingIdHandler = async (req, res) => {
    const { id } = req.params;
    try{
        const booking = await getBookingById(id);
        res.status(200).json(booking);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const postBookingsHandler = async (req, res) => {
    const bookingData = req.body;
    try{
        const booking = await postBooking(bookingData);
        res.status(200).json(booking);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const putBookingsHandler = async (req, res) => {
    const { id } = req.params;
    const bookingData = req.body;

    try{
        const booking = await putBooking(id, bookingData);
        res.status(200).json(booking);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const deleteBookingHandler = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedBooking = await deleteBooking(id);
        res.status(200).json({message: "Delete sucess"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const getBookingsDeletedHandler = async (req, res) => {
    try{
        const deletedBooking = await getBookingsDeleted( req.query );
        res.status(200).json(deletedBooking);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const restoreBookingHandler = async (req, res) => {
    const { id } = req.body;
    try{
        const bookingToRestore = await restoreBooking(id);
        res.status(200).json({message: "restore sucess"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getBookingsHandler,
    getBookingsUserHandler,
    getBookingIdHandler,
    postBookingsHandler,
    putBookingsHandler,
    deleteBookingHandler,
    getBookingsDeletedHandler,
    restoreBookingHandler
}