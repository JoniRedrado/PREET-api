const { Router } = require('express');
const hotelsRouter = Router();
const { getHotelIdHandler, postHotelHandler } = require('../handlers/hotelsHandlers');

//Endpoints
//hotelsRouter.get("/", getHotels)
hotelsRouter.post('/', postHotelHandler)

hotelsRouter.get('/:id', getHotelIdHandler);

module.exports = hotelsRouter