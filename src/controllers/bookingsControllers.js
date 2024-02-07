const { Booking } = require('../../db.js');

const getBookings = async () => {
    let bookings = await Booking.findAll();
    return bookings
}
const postBooking = async (bookings) => {
    //validacion habitacion disponible
    const {dateInit, dateFinal, pay, roomId, userId} = bookings
    const newBooking = await Booking.create({dateInit, dateFinal, pay, roomId, userId})
    return newBooking
}
  //get reservas por id
  //put reservas
  //delete reservas
  //get reservas borradas
  //restore reservas
module.exports = {
    getBookings,
    postBooking
}