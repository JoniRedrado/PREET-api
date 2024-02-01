const {Hotel, User } = require('../../db.js')
const  {Op} = require ("sequelize")

const getHotelsDeleteSoft = async (query) => {

    const { page = 1, 
        size = 20,
    } = query

const options = {
    limit: Number(size),
    offset: ( page - 1 ) * Number(size),
    paranoid: false,
    where: {deletedAt: { [Op.not]: null }},	
}

const { count, rows } = await Hotel.findAndCountAll(options)
const deleteHotels = {
    total: count,
    hotels: rows
}

return deleteHotels
}
const restoreHotel = async (id) => {
    const hotel = await Hotel.findByPk(id, { paranoid: false });
      
    const restoreH = await hotel.restore();

    return restoreH;
  };
const getUsersDeleteSoft = async (query) => {

    const { page = 1, 
        size = 20,
    } = query

const options = {
    limit: Number(size),
    offset: ( page - 1 ) * Number(size),
    paranoid: false,
    where: {deletedAt: { [Op.not]: null }},	
}

const { count, rows } = await User.findAndCountAll(options)
const deleteUsers = {
    total: count,
    users: rows
}

return deleteUsers
}
const restoreUser = async (email) => {
    const user = await User.findOne({ where: { email }, paranoid: false });
    const restoreU = await user.restore();
    return restoreU;
  };
  module.exports = {
    getHotelsDeleteSoft,
    restoreHotel,
    getUsersDeleteSoft,
    restoreUser
}