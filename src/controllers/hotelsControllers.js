const { Hotel, Country } = require('../../db.js')

const postHotel = async (hotel)=>{

    const { name, address, address_url, price, email, image, countryId } = hotel
    //Buscar por nombre el pais del hotel
    const hotelCountry = await Country.findOne({ where: { name: countryId} })
    
    //Formatear los datos para que cumpla con el modelo de la DB
    const hotelData = { name, address, address_url, price, email, image, countryId: hotelCountry.dataValues.id }
    
    //crear el hotel
    const newHotel = await Hotel.create(hotelData)
    return newHotel/*hotel creado*/
}

module.exports = {
    postHotel
}