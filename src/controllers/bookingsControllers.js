const { Booking, User, Room, Hotel } = require('../../db.js');
const { Op } = require("sequelize");
const getBookings = async (query) => {
    const { page = 1, size = 30 } = query
    const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size),
    }
    const {count, rows} = await Booking.findAndCountAll(options)
    const bookings = {
        total: count,
        bookings: rows
    }
    return bookings
}
const getBookingsUser = async (id, query) => {
    const { page = 1, size = 30 } = query
    const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size),
        where: {userId: id},
    }
    const {count, rows} = await Booking.findAndCountAll(options)
    let bookings = {
        total: count,
        bookings: rows
    }
    return bookings
}
const getBookingUserLast = async (id) => {
    const options = {
        where: {userId: id},
        order: [['createdAt', 'DESC']], 
        limit: 1
    }
    const lastBooking = await Booking.findOne(options); 
    return lastBooking; 
}
const getBookingById = async (id) => {
    let booking = await Booking.findByPk(id,{
        include: [
            {
                model: User,
                attributes: ['name', 'last_name', 'email']
            },
            {
                model: Room,
                attributes: ['type', 'numeration', 'price', 'description'],
                include: {
                    model: Hotel,
                    attributes: ['name']
                }
            }
        ]
    });
    return booking;
}
const postBooking = async (bookings) => {
    //validacion habitacion disponible
    const {dateInit, dateFinal, pay, roomId, userId} = bookings
    const newBooking = await Booking.create({dateInit, dateFinal, pay, roomId, userId})
    return newBooking
}
const putBooking = async (id, updateBookingData) => {
    const bookingToUpdate = await Booking.findByPk(id);

    if (!bookingToUpdate) {
        throw new Error('Booking not found');
    }

    const { dateInit, dateFinal, pay, roomId} = updateBookingData;
    const updatedBooking = await bookingToUpdate.update({ dateInit, dateFinal, pay, roomId});
    
    return updatedBooking;
}
const deleteBooking = async (id) => {
    const bookingToDelete = await Booking.findByPk(id);
    const deletedBooking = await bookingToDelete.destroy();
    return deletedBooking
}
const getBookingsDeleted = async (query) => {
    const { page = 1, size = 30 } = query
    const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size),
        paranoid: false,
        where: {deletedAt: { [Op.not]: null }}
    }
    const {count, rows} = await Booking.findAndCountAll(options)
    const deletedBookings = {
        total: count,
        bookings: rows
    }
    return deletedBookings
}
const restoreBooking = async (id) => {
    const bookingToRestore = await Booking.findByPk(id, {paranoid: false});
    const restoredBooking = await bookingToRestore.restore();
    return restoredBooking
}

module.exports = {
    getBookings,
    getBookingsUser,
    getBookingUserLast,
    getBookingById,
    postBooking,
    putBooking,
    deleteBooking,
    getBookingsDeleted,
    restoreBooking
}