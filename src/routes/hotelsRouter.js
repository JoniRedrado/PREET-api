const { Router } = require('express');
const hotelsRouter = Router();
const { getHotelIdHandler } = require('../handlers/hotelsHandlers');
//Handlers para cada endpoint
const { postHotelHandler } = require('../handlers/hotelHandlers')

//Endpoints
//hotelsRouter.get("/", getHotels)
hotelsRouter.post('/', postHotelHandler)


hotelsRouter.get('/:id', getHotelIdHandler);

module.exports = hotelsRouter