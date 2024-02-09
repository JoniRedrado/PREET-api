const { Room, Booking } = require('../../db.js');
const { Op } = require("sequelize");
const getAvailableRooms = async () => {
  // obtener habitaciones disponibles de un hotel especifico
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
  const getRoomByType = async (type) => {
    let rooms = await Room.findAll({
      where: {
        type: {
          [Op.iLike]: `%${type}%`
        }
      }
    });
    return rooms
  }
  const getRoomNumeration = async (numeration) => {
      let room = await Room.findAll({
        where: {
          numeration: {
            [Op.iLike]: `%${numeration}%`
          }
        }
      });
      return room
  }
const getRoomId = async (id) => {
    let room = await Room.findByPk(id);
    return room
}
const postRoom = async (rooms, hotelId) => {
    const { type, numeration, price, description} = rooms
    const newRoom = await Room.create({type, numeration, price, description, hotelId})
    return newRoom
}
const putRoom = async (id, updatedRoomData) => {
  const roomToUpdate = await Room.findByPk(id);
  if (!roomToUpdate) {  
    throw new Error('Room not found');
  }  
  const { type, numeration, price, description } = updatedRoomData;
  const updatedRoom = await roomToUpdate.update({type, numeration, price, description});
  return updatedRoom;
}
const deleteRoom = async (id) => {
  const roomToDelete = await Room.findByPk(id);
  const deletedRoom = await roomToDelete.destroy();
  return deletedRoom
}
const getRoomsDeleted = async (query) => {
  const  {page = 1, size = 30} = query
  const options = {
    limit: Number(size),
    offset: (page - 1) * Number(size),
    paranoid: false,
    where: {deletedAt: { [Op.not]: null}}
  }
  const {count, rows} = await Room.findAndCountAll(options)
  const deletedRooms = {
    total: count,
    rooms: rows
  }
  return deletedRooms
}
const restoreRoom = async (id) => {
  const room = await Room.findByPk(id, { paranoid: false });
  const restoreR = await room.restore();
  return restoreR
}

module.exports = {
    getAvailableRooms,
    getRoomByType,
    getRoomNumeration,
    getRoomId,
    postRoom,
    putRoom,
    deleteRoom,
    getRoomsDeleted,
    restoreRoom
}