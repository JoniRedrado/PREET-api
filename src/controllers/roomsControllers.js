const { Room, Booking, Hotel } = require('../../db.js');
const { Op } = require("sequelize");

const getAvailableRooms = async ( startDate = new Date(), endDate = new Date(), id) => {
  const entryDate = new Date(startDate)
  const finishDate = new Date(endDate)

  let bookedRooms = await Booking.findAll({
    attributes: ['roomId'],
    where: {
        [Op.or]: {
          dateFinal: { [Op.between]:[entryDate, finishDate] },
          dateInit: { [Op.between]:[entryDate, finishDate] },
          [Op.and]: {
            dateInit: {[Op.lte]: entryDate},
            dateFinal: {[Op.gte]: finishDate}
          },
        },
    },
  });

  let rooms = await Room.findAll({
    where: {
      id: {
        [Op.notIn]: bookedRooms.map(booking => booking.roomId)
      }
    },
    include:{
      model: Hotel,
      where:{
        id
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
    const { type, numeration, price, guest, description} = rooms

    const existingRoomNumeration = await Room.findOne({ where: { numeration, hotelId } });
    if (existingRoomNumeration) {
        throw new Error('A room with the same numeration already exists in this hotel');
    }
    
    const newRoom = await Room.create({type, numeration, price, guest, description, hotelId})
    return newRoom
}

const putRoom = async (id, updatedRoomData) => {
  const roomToUpdate = await Room.findByPk(id);
  if (!roomToUpdate) {  
    throw new Error('Room not found');
  }  
  const { type, numeration, price, description } = updatedRoomData;
  const updatedRoom = await roomToUpdate.update({type, numeration, price, guest, description});
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