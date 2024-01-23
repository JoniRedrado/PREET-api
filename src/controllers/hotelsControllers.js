const { Hotel, Country } = require('../../db.js');

const getHotelById  = async(id) => {
    const hotel = await Hotel.findByPk(id, {
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name'],
        }]
    });
    return hotel;
}

module.exports = {
    getHotelById
}