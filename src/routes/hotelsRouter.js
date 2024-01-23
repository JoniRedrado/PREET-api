const { Router } = require('express');
const hotelsRouter = Router();
const { getHotelIdHandler } = require('../handlers/hotelsHandlers');
//Handlers para cada endpoint

//Endpoints
//hotelsRouter.get("/", getHotels)

hotelsRouter.get('/:id', getHotelIdHandler);

module.exports = hotelsRouter