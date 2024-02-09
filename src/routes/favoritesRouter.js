const {Router} = require('express')
const userRouter = Router()
const {getFavoritesHandler,
    getFavoritesUserHandler,
    getFavoritesHotelHandler,    
    postFavoriteHandler, 
    deleteFavoriteHandler} = require('../handlers/favoritesHandlers')
const verifyToken = require('../utils/verifyToken')

userRouter.get('/', getFavoritesHandler)
userRouter.get("/user", verifyToken, getFavoritesUserHandler)
userRouter.get("/hotel/:id", getFavoritesHotelHandler)
userRouter.post("/:hotelId", verifyToken, postFavoriteHandler)
userRouter.delete("/:id", verifyToken, deleteFavoriteHandler)

module.exports = userRouter