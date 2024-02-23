const { Room, Booking, Hotel, RoomImages } = require('../../db.js');
const { Op } = require("sequelize");

const getRooms = async (query) => {
  const  {page = 1, size = 10, type} = query
  let options = {
    limit: Number(size),
    offset: (page - 1) * Number(size),
    include: [{ model: Hotel, attributes: ['name'] }, 
              { model: RoomImages, as: 'image', attributes: ['image']},
    ],
  }

  const {count, rows} = await Room.findAndCountAll(options)
  const room = {
    total: count,
    rooms: rows
  }
  return room
}

const getRoomByType = async (query, type) => {
  const {page = 1, size = 10} = query
  let {count, rows} = await Room.findAndCountAll({
    limit: Number(size),
    offset: (page - 1) * Number(size),
    include: [{ model: Hotel, attributes: ['name'] }, 
              { model: RoomImages, as: 'image', attributes: ['image']},
    ],
    where: {
      type: type
    }
  });

  const rooms = {
    total: count,
    rooms: rows
  }

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
    let room = await Room.findByPk(id, {
      include: [
              { model: RoomImages, as: 'image', attributes: ['image']},
    ],
    });
    return room
}

const postRoom = async (rooms, hotelId) => {
    const { type, numeration, price, guest, image, description} = rooms
    
    const images = Array.isArray(image) ? image : [image];

    const existingRoomNumeration = await Room.findOne({ where: { numeration, hotelId } });
    if (existingRoomNumeration) throw new Error('A room with the same numeration already exists in this hotel');

    const newRoom = await Room.create({type, numeration, price, guest, description, hotelId});
    await RoomImages.bulkCreate(images.map(img => ({roomId: newRoom.id, image: img})));

    return newRoom
}

const putRoom = async (id, updatedRoomData) => {
  const roomToUpdate = await Room.findByPk(id);

  if (!roomToUpdate) throw new Error('Room not found');
   
  const { type, numeration, price, guest, image, description } = updatedRoomData;
  const updatedRoom = await roomToUpdate.update({type, numeration, price, guest, description});

  const images = Array.isArray(image) ? image : [image];

  const imagesRoom = (await RoomImages.findAll({
      where: { roomId: id }, 
      attributes: ['image'], 
      raw: true
  })).map(img => img.image);

  const imagesDelete = [ ...new Set(imagesRoom.filter(img => !images.includes(img))) ];
  const imagesAdd = images.filter(img => !imagesRoom.includes(img));

  // Elimina las imagenes no incluidas en el arreglo
  if(imagesDelete.length > 0) await RoomImages.destroy({
      where: {
          roomId: id,
          image:{ [Op.in]: imagesDelete }
      }
  });

  // Crea las imagenes nuevas
  if(images.length > 0) await RoomImages.bulkCreate(imagesAdd.map(img => ({roomId: id, image:img})));

  return updatedRoom;
}

const deleteRoom = async (id) => {
  const roomToDelete = await Room.findByPk(id);
  const deletedRoom = await roomToDelete.destroy();
  return deletedRoom
}

const getRoomsDeleted = async (query) => {
  const  {page = 1, size = 10 , type} = query
  let options = {
    limit: Number(size),
    offset: (page - 1) * Number(size),
    paranoid: false,
    include: [{ model: Hotel, attributes: ['name'] }, 
              { model: RoomImages, as: 'image', attributes: ['image']},
    ],
    where: {deletedAt: { [Op.not]: null}}
  }

  if(type){
    options.where.type = type
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
    getRooms,
    getRoomByType,
    getRoomNumeration,
    getRoomId,
    postRoom,
    putRoom,
    deleteRoom,
    getRoomsDeleted,
    restoreRoom
}