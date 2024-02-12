const { Favorite, Hotel, User, HotelImages, Country} = require('../../db.js');

const getFavorites = async (query) => {
    const { page = 1, size = 30} = query;
    const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size),
        include: [
            { 
                model: Hotel, 
                attributes: ['name', 'stars'],
                include: [{ model: Country, attributes: ['name'] },
                    { model: HotelImages, as: 'image', attributes: ['image'] }],
            },
            { model: User, attributes: ['name', 'last_name', 'email'] }
        ]
    };
    const { count, rows } = await Favorite.findAndCountAll(options);
    const favorites = {
        total: count,
        Favorite: rows
    };
    return favorites;
}
const getFavoritesUser = async (id, query) => {
    const { page = 1, size = 6 } = query;
    const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size),
        where: { userId: id },
        include: [
            { 
                model: Hotel, 
                attributes: ['name', 'stars'],
                include: [{ model: Country, attributes: ['name'] },
                    { model: HotelImages, as: 'image', attributes: ['image'] }],
            }
        ]
    };

    const { count, rows } = await Favorite.findAndCountAll(options);
    const favorites = {
        total: count,
        favorites: rows 
    };
    return favorites;
}
const getFavoritesHotel = async (id, query) => {
    const { page = 1, size = 6,} = query   
     const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size),
        where: {hotelId: id},
        include: [{ model: User, attributes: ['name', 'last_name'] }]
    }
    const { count, rows } = await Favorite.findAndCountAll(options);
        const favorites = {
            total: count,
            Favorite: rows
        }
        return favorites
}
const postFavorite = async (hotelId, id) => {
    const existingFavorite = await Favorite.findOne({ where: { hotelId, userId: id } });
    if (existingFavorite) {
        throw new Error('Favorite already exists');
    } else {
        const newFavorite = await Favorite.create({ hotelId, userId: id });
        return newFavorite;
    }
}
const deleteFavorite = async (id) => {
    const deletedFavorite = await Favorite.destroy({where: {id}})
    return deletedFavorite
}
module.exports = {
    getFavorites,
    getFavoritesUser,
    getFavoritesHotel,
    postFavorite,
    deleteFavorite
}