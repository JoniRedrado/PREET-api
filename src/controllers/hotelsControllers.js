const { Hotel, Country } = require('../../db.js')
const  {Op} = require ("sequelize")

const getHotels = async (query) => {

    const { page = 1, 
            size = 6,
            stars,
            minPrice = 0,
            maxPrice = 10000,
            price,
            country,
            orderBy = 'name',
            direction = 'ASC',
        } = query

    let where = {}
    where = {
        ...(stars && {stars}),
        ...(minPrice && {price: { [Op.gte]: minPrice } }),
        ...(maxPrice && {price: { [Op.lte]: maxPrice } }),
        ...(minPrice && maxPrice && {price: { [Op.between]: [minPrice, maxPrice] } }),
        ...(price && {price}),
        ...(country && {countryId: country}),
    }

    /*let order = [];
    let orderItem = [];

    if(orderBy){
        if(orderBy === 'country'){
            orderItem.push(Country);
            orderItem.push('name');
        }else orderItem.push(orderBy)
    }else if(direction) orderItem.push('name');

    if(direction) orderItem.push(direction);  
    else if(orderBy) orderItem.push('ASC'); 

    if(orderItem.length > 0) order.push(orderItem);
    */
    const options = {
        limit: Number(size),
        offset: ( page - 1 ) * Number(size),
        order: [[orderBy === '' ? 'name' : orderBy, direction === '' ? 'ASC' : direction]],
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name']
        }],
        where
    }

    const { count, rows } = await Hotel.findAndCountAll(options)
    const hotels = {
        total: count,
        Hotel: rows
    }

    return hotels
}

const getHotelByName = async (name, query) => {

    const { page = 1, 
      size = 6,
      stars,
      minPrice = 0,
      maxPrice = 10000,
      price,
      orderBy = 'name',
      direction = 'ASC',
      country 
    } = query

    let where = {}
    where = {
        name: {
            [Op.iLike]: `%${name}%`
        },
        ...(stars && {stars}),
        ...(minPrice && {price: { [Op.gte]: minPrice } }),
        ...(maxPrice && {price: { [Op.lte]: maxPrice } }),
        ...(minPrice && maxPrice && {price: { [Op.between]: [minPrice, maxPrice] } }),
        ...(price && {price}),
        ...(country && {countryId: country}),
}

    const options = {
        limit: Number(size),
        offset: ( page - 1 ) * Number(size),
        order: [[orderBy, direction]],
        where,
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name'],
        }],
  }

    const { count, rows } = await Hotel.findAndCountAll(options)
    const hotels = {
        total: count,
        Hotel: rows
    }

    return hotels
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

    const { name, address, address_url, price, email, stars,  image, countryId } = updatedHotelData;

    let updatedCountryId = countryId;
    if (countryId && typeof countryId !== 'number') {
        // Si countryId es un nombre de país, busca el ID correspondiente
        const updatedCountry = await Country.findOne({ where: { name: countryId } });
        updatedCountryId = updatedCountry ? updatedCountry.id : countryId;
    }

    const updatedHotel = await hotelToUpdate.update({
        name,
        address,
        address_url,
        price,
        email,
        stars,
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
