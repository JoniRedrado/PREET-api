const { Booking, Room, Hotel } = require('../../db.js');

const getBookings = async () => {
    let bookings = await Booking.findAll();
    return bookings
}
const postBooking = async (bookings) => {
    const {dateInit, dateFinal, roomId} = bookings
    const newBooking = await Booking.create({dateInit, dateFinal, roomId})
    return newBooking
}

module.exports = {
    getBookings,
    postBooking
}