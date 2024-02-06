const { getBookings, postBooking } = require('../controllers/bookingsControllers');

const getBookingsHandler = async (req, res) => {
    try{
        const bookings = await getBookings();
        res.status(200).json(bookings);
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

module.exports = {
    getBookingsHandler,
    postBookingsHandler
}