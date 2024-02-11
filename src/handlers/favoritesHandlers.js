const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config()
const { SECRET_KEY } = process.env;
const { getFavorites, 
    getFavoritesUser, 
    getFavoritesHotel, 
    postFavorite, 
    deleteFavorite} = require('../controllers/FavoritesControllers.js');

const getFavoritesHandler = async (req, res) => {
try {
    const query = req.query
    const favorites = await getFavorites(query)
    res.status(200).json(favorites)
} catch (error) {
    res.status(400).json({message: error.message})
}
}
const getFavoritesUserHandler = async (req, res) => {
try {
    const { id } = req.user
    const query = req.query
    const favorites = await getFavoritesUser(id, query)
    res.status(200).json(favorites)
} catch (error) {
    res.status(400).json({message: error.message})
}
}
const getFavoritesHotelHandler = async (req, res) => {
    try {
        const { id } = req.params
        const query = req.query
        const favorites = await getFavoritesHotel(id, query)
        res.status(200).json(favorites)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const postFavoriteHandler = async (req, res) => {
    try {
    const { id } = req.user
    const { hotelId } = req.params
    // const { hotelId} = req.body

    const favorite = await postFavorite(hotelId, id)
    res.status(200).json(favorite)
} catch (error) {
    res.status(400).json({message: error.message})
}
}
const deleteFavoriteHandler = async (req, res) => {
    try {
        const { id } = req.params
        const favorite = await deleteFavorite(id)
        res.status(200).json({message: "Delete sucess"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports = { 
    getFavoritesHandler,
    getFavoritesUserHandler,
    getFavoritesHotelHandler,
    postFavoriteHandler,
    deleteFavoriteHandler
}