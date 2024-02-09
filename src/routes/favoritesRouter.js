const {Router} = require('express')
const userRouter = Router()
const {getFavoritesHandler,
    getFavoritesUserHandler,
    getFavoritesHotelHandler,    
    postFavoriteHandler, 
    deleteFavoriteHandler} = require('../handlers/favoritesHandlers')

userRouter.get('/', getFavoritesHandler)
userRouter.get("/user", getFavoritesUserHandler)
userRouter.get("/hotel/:id", getFavoritesHotelHandler)
userRouter.post("/", postFavoriteHandler)
userRouter.delete("/:id", deleteFavoriteHandler)

module.exports = userRouter