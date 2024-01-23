const { Router } = require('express')
const hotelsRouter = Router()
//Handlers para cada endpoint
const { postHotelHandler } = require('../handlers/hotelHandlers')

//Endpoints
//hotelsRouter.get("/", getHotels)
hotelsRouter.post('/', postHotelHandler)


module.exports = hotelsRouter