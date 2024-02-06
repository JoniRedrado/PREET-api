const { Room, Booking } = require('../../db.js');
const { Op } = require("sequelize");
const getAvalableRooms = async () => {
  currentDate = new Date();
  let bookedRooms = await Booking.findAll({
    attributes: ['roomId'],
    where: {
      dateInit: {
        [Op.lte]: currentDate
      },
      dateFinal: {
        [Op.gte]: currentDate
      }
    }
  });

  let rooms = await Room.findAll({
    where: {
      id: {
        [Op.notIn]: bookedRooms.map(booking => booking.roomId)
      }
    }
  });
    return rooms
  }
  //get habitaciones disponibles/ no disponibles
  //get habitaciones por tipo
  //get habitaciones por id
  //get habitaciones por numeracion
  //put habitaciones
  //delete habitaciones
  //get habitaciones borradas
  //restore habitaciones
const postRoom = async (rooms) => {
    const { type, numeration, price, description, hotelId } = rooms
    const newRoom = await Room.create({type, numeration, price, description, hotelId})
    return newRoom
}

module.exports = {
    getAvalableRooms,
    postRoom
}