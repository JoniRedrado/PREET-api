const { Hotel, Country, Room, HotelImages, Booking, RoomImages} = require('../../db.js')
const  {Op} = require ("sequelize")

const getHotels = async (query) => {
    const { page = 1, 
        size = 6,
        stars,
        type,
        name,
        minPrice = 1,
        maxPrice = 10000,
        country,
        orderBy = 'name',
        direction = 'ASC',
        startDate = new Date(),
        endDate = new Date(),
        guest
    } = query

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

    let where = {hotel:{}, room:{}, country:{}};
    where.hotel = {
        ...(name && {name: {[Op.iLike]: `%${name}%`}}), 
        ...(!name && country && {countryId: country}),
        ...(!name && stars && {stars}),
    }

    where.room = {
        ...(type && {type}),
        ...(!name && minPrice && maxPrice && {price: { [Op.between]: [minPrice, maxPrice] }}),
        ...({id: {
            [Op.notIn]: bookedRooms.map(booking => booking.roomId)
          }}),
        ...(guest && {guest})
    }
    
   const options = {
       limit: Number(size),
       offset: ( page - 1 ) * Number(size),
       order: [[orderBy === '' ? 'name' : orderBy, direction === '' ? 'ASC' : direction]],
       include: [
            {   model: Country,
                as: 'country',
                attributes: ['name'],
            },
            {
                model: HotelImages,
                as: 'image',
                attributes: ['image'] },
            {   model: Room,
                attributes: ['id', 'type', 'price'],
                order: [['type', 'ASC']],
                where: where.room }
        ],
        distinct: true,
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', ]},
        where: where.hotel
    }
    
    const { count, rows } = await Hotel.findAndCountAll(options);

    const hotels = {
        total: count,
        Hotel: rows.map(hotel => {
            const idRooms = [];
            const minPrice = {price: hotel?.rooms[0]?.price, type:hotel?.rooms[0]?.type};
            const maxPrice = {...minPrice};

            hotel.rooms.forEach(room => {
                idRooms.push(room.id);
                if(room.price < minPrice.price){
                    minPrice.price = room.price;
                    minPrice.type = room.type;
                }
                if(room.price > maxPrice.price){
                    maxPrice.price = room.price;
                    maxPrice.type = room.type;
                }
            });
            
            return { ...hotel?.toJSON(), image: hotel?.image[0].image, rooms: [minPrice, maxPrice], idRooms};
        })
    }
    
    return hotels
}

const getHotelById  = async(id) => {
    const hotel = (await Hotel.findByPk(id, {
        include: [{
                model: Country,
                as: 'country',
                attributes: ['name'],
            },
            {
                model: HotelImages,
                as: 'image',
                attributes:['image']
            },
            {
                model: Room,
                attributes: ['id', 'type', 'numeration', 'price', 'description'],
                include: [{
                    model: RoomImages,
                    as: 'image',
                    attributes: ['image']
                }]
            },
        ]
    }))?.toJSON();

    return { ...hotel, 
            image: hotel?.image.map(img => img.image),
            rooms: hotel?.rooms.map(room => ({...room, image: room.image.map(img => img.image)}))};
}

const getHotelRanging = async () => {
    const rankingHotels = await Hotel.findAll({
        order: [['ranking', 'DESC']],
        attributes:{exclude:['createdAt', 'updatedAt', 'deletedAt']},
        include:[ 
            {   model: HotelImages,
                as: 'image',
                attributes: ['image'],
                order:[['createdAt', 'ASC']],
                limit: 1 // solo trae la imagen mas antigua
            }
        ],
        limit: 5
    })

    return rankingHotels.map(hotel => ({...hotel?.toJSON(), image: hotel?.image[0]?.image}))
}

const postHotel = async (hotel)=>{
    const { name, address, address_url, stars, email, image, countryId } = hotel

    const images = Array.isArray(image) ? image : [image];
    //Buscar por nombre el pais del hotel

    const hotelCountry = await Country.findOne({ where: { name: countryId} })

    //Formatear los datos para que cumpla con el modelo de la DB
    const hotelData = { name, address, address_url, stars, email, countryId: hotelCountry.dataValues.id }
    //crear el hotel
    const newHotel = await Hotel.create(hotelData);
    await HotelImages.bulkCreate(images.map(img => ({hotelId: newHotel.id, image: img})));

    return { id: newHotel.id, name: newHotel.name }/*hotel creado*/
}

const putHotel = async (id, updatedHotelData) => {
    const hotelToUpdate = await Hotel.findByPk(id);
    if (!hotelToUpdate) throw new Error('Hotel not found');

    const { name, address, address_url, stars, email, image, countryId } = updatedHotelData;
    const images = Array.isArray(image) ? image : [image];

    let updatedCountryId = countryId;
    if (countryId && typeof countryId !== 'number') {
        // Si countryId es un nombre de país, busca el ID correspondiente
        const updatedCountry = await Country.findOne({ where: { name: countryId } });
        updatedCountryId = updatedCountry ? updatedCountry.id : countryId;
    }

    const imagesHotel = (await HotelImages.findAll({
        where: { hotelId: id }, 
        attributes: ['image'], 
        raw: true
    })).map(img => img.image);

    const imagesDelete = [ ...new Set(imagesHotel.filter(img => !images.includes(img))) ];
    const imagesAdd = images.filter(img => !imagesHotel.includes(img));
    
    // Elimina las imagenes no incluidas en el arreglo
    if(imagesDelete.length > 0) await HotelImages.destroy({
        where: {
            hotelId: id,
            image:{ [Op.in]: imagesDelete }
        }
    });

    // Crea las imagenes nuevas
    if(images.length > 0) await HotelImages.bulkCreate(imagesAdd.map(img => ({hotelId: id, image:img})));

    const updatedHotel = await hotelToUpdate.update({
        name,
        address,
        address_url,
        stars,
        email,
        countryId: updatedCountryId,
    });

    return { id: updatedHotel.id, name: updatedHotel.name };
};

const deleteHotel = async (id) => {
    const hotelToDelete = await Hotel.findByPk(id);
    const deletedHotel = await hotelToDelete.destroy()

    return deletedHotel;
}

const getHotelsDeleted = async (query) => {

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
module.exports = {
    getHotels,
    getHotelById,
    getHotelRanging,
    postHotel,
    putHotel,
    deleteHotel,
    getHotelsDeleted,
    restoreHotel
}