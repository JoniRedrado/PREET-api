const { Hotel, Country, Room} = require('../../db.js')
const  {Op} = require ("sequelize")

const getHotels = async (query) => {
    
    const { page = 1, 
        size = 6,
        stars,
        minPrice = 1,
        maxPrice = 10000,
        price,
        country,
        orderBy = 'name',
        direction = 'ASC',
    } = query
    
    let where = {}
    where = {
        ...(price && {price}),
        ...(minPrice && {price: { [Op.gte]: minPrice } }),
        ...(maxPrice && {price: { [Op.lte]: maxPrice } }),
        ...(minPrice && maxPrice && {price: { [Op.between]: [minPrice, maxPrice] } })
    }
    
   const options = {
       limit: Number(size),
       offset: ( page - 1 ) * Number(size),
       order: [[orderBy === '' ? 'name' : orderBy, direction === '' ? 'ASC' : direction]],
       include: [
            {   model: Country,
                as: 'country',
                attributes: ['name'] },

            {   model: Room,
                attributes: ['id', 'type', 'price'],
                order: [['type', 'ASC']],
                where }
        ],
        distinct: true,
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', ]},
        where: {...(stars && {stars}), ...(country && {countryId: country})}
    }
    
    const { count, rows } = await Hotel.findAndCountAll(options);

    const hotels = {
        total: count,
        Hotel: rows.map(hotel => {
            const newRooms = {};
            hotel.rooms.forEach(room => {
                if(!newRooms[`${room.type}`]) newRooms[`${room.type}`] = {id:[], type:room.type, price:[]};
                newRooms[`${room.type}`].id.push(room.id);
                newRooms[`${room.type}`].price.push(room.price);
            });
            
            return { ...hotel.toJSON(), rooms: Object.values(newRooms)};
        })
    }
    
    return hotels
}

const getHotelByName = async (name, query) => {
    
    const { page = 1, 
        size = 6,
        stars,
        //   minPrice = 0,
        //   maxPrice = 10000,
        //   price,
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
        // ...(minPrice && {price: { [Op.gte]: minPrice } }),
        // ...(maxPrice && {price: { [Op.lte]: maxPrice } }),
        // ...(minPrice && maxPrice && {price: { [Op.between]: [minPrice, maxPrice] } }),
        // ...(price && {price}),
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
const getHotelById  = async(id) => {
    const hotel = await Hotel.findByPk(id, {
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name'],
            },
            {
                model: Room,
                attributes: ['type', 'numeration', 'price', 'description'],
            }
        ]
    });
    return hotel;
}
const getHotelRanging = async () => {
    const rankingHotels = await Hotel.findAll({
        order: [['ranking', 'DESC']],
        limit: 5
    })
    return rankingHotels
}
const postHotel = async (hotel)=>{
    
    const { name, address, address_url, stars, email, image, countryId } = hotel
    
    //Buscar por nombre el pais del hotel
    const hotelCountry = await Country.findOne({ where: { name: countryId} })
    
    //Formatear los datos para que cumpla con el modelo de la DB
    const hotelData = { name, address, address_url, stars, email, image, countryId: hotelCountry.dataValues.id }
    
    //crear el hotel
    const newHotel = await Hotel.create(hotelData)
    return newHotel/*hotel creado*/
}


const putHotel = async (id, updatedHotelData) => {
    const hotelToUpdate = await Hotel.findByPk(id);

    if (!hotelToUpdate) {
        throw new Error('Hotel not found');
    }

    const { name, address, address_url, stars, email, image, countryId } = updatedHotelData;

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
        stars,
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
    getHotelById,
    getHotelRanging,
    postHotel,
    putHotel,
    deleteHotel
}
