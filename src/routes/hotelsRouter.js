const { Router } = require('express');
const hotelsRouter = Router();
const {validate} = require ("../utils/validatePost")
const { getHotelIdHandler, postHotelHandler, getHotelsHandler } = require('../handlers/hotelsHandlers');

//Endpoints
//hotelsRouter.get("/", getHotels)
hotelsRouter.post('/', validate, postHotelHandler)

hotelsRouter.get('/:id', getHotelIdHandler);
hotelsRouter.get('/', getHotelsHandler)


module.exports = hotelsRouter