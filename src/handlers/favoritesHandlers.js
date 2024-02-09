const { getFavorites, 
    getFavoritesUser, 
    getFavoritesHotel, 
    postFavorite, 
    deleteFavorite} = require('../controllers/FavoritesControllers')

const getFavoritesHandler = async (req, res) => {
    const query = req.query
    const favorites = await getFavorites(query)
    res.status(200).json(favorites)
}
const getFavoritesUserHandler = async (req, res) => {
    // const { id } = req.user
    const { id } = req.body
    // const { id } = req.params
    const query = req.query
    const favorites = await getFavoritesUser(id, query)
    res.status(200).json(favorites)
}
const getFavoritesHotelHandler = async (req, res) => {
    const { id } = req.params
    const query = req.query
    const favorites = await getFavoritesHotel(id, query)
    res.status(200).json(favorites)
}
const postFavoriteHandler = async (req, res) => {
    // const { hotelId } = req.params
    // const { id } = req.user
    const { hotelId, userId } = req.body
    const favorite = await postFavorite(hotelId, userId)
    res.status(200).json(favorite)
}
const deleteFavoriteHandler = async (req, res) => {
    const { id } = req.params
    const deletedFavorite = await deleteFavorite(id)
    res.status(200).json({message: "Delete sucess"})
}
module.exports = { 
    getFavoritesHandler,
    getFavoritesUserHandler,
    getFavoritesHotelHandler,
    postFavoriteHandler,
    deleteFavoriteHandler
}