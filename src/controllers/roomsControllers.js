const { Room, Hotel } = require('../../db.js');
const getRooms = async () => {
    let rooms = await Room.findAll({
      include: {
        model: Hotel, 
        attributes: ['name']
    }
    });
    return rooms
  }
const postRoom = async (rooms) => {
    const { type, price, description, stock, hotelId } = rooms
    const newRoom = await Room.create({type, price, description, stock, hotelId})
    return newRoom
}
module.exports = {
    getRooms,
    postRoom
}