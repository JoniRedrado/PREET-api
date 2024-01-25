const { Hotel, Country } = require('../../db.js')
const  {Op} = require ("sequelize")

const getHotels = async () => {
    const hotels = await Hotel.findAll({
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name'],
        }]
    })

    return hotels
}

const getHotelByName = async (name) => {
    const hotelByName = await Hotel.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name'],
        }]
    });
    const allName = hotelByName.filter(hotel => hotel.name.toLowerCase().includes(name.toLowerCase()));
    return allName;
}
const postHotel = async (hotel)=>{

    const { name, address, stars, address_url, price, email, image, countryId } = hotel

    //Buscar por nombre el pais del hotel
    const hotelCountry = await Country.findOne({ where: { name: countryId} })
    
    //Formatear los datos para que cumpla con el modelo de la DB
    const hotelData = { name, address, stars, address_url, price, email, image, countryId: hotelCountry.dataValues.id }
    
    //crear el hotel
    const newHotel = await Hotel.create(hotelData)
    return newHotel/*hotel creado*/
}

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
const putHotel = async (id, updatedHotelData) => {
        const hotelToUpdate = await Hotel.findByPk(id);

        if (!hotelToUpdate) {
            throw new Error('Hotel not found');
        }

        const { name, address, address_url, price, email, image, countryId } = updatedHotelData;

        let updatedCountryId = hotelToUpdate.countryId;
        if (countryId) {
            const updatedCountry = await Country.findOne({ where: { name: countryId } });
            updatedCountryId = updatedCountry ? updatedCountry.dataValues.id : updatedCountryId;
        }

        const updatedHotel = await hotelToUpdate.update({
            name,
            address,
            address_url,
            price,
            email,
            image,
            countryId: updatedCountryId,
        });

        return updatedHotel;
};

const deleteHotel = async (id) => {
    const hotelToDelete = await Hotel.findByPk(id);
    const deletedHotel = await hotelToDelete.destroy()

    return deletedHotel;
}

module.exports = {
    getHotels,
    getHotelByName,
    postHotel,
    getHotelById,
    putHotel,
    deleteHotel
}
