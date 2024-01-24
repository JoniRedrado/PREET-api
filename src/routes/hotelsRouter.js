const { Router } = require('express');
const hotelsRouter = Router();
const {validate} = require ("../utils/validatePost")
const { getHotelIdHandler, postHotelHandler, putHotelHandler, deleteHotelHandler } = require('../handlers/hotelsHandlers');

//Endpoints
//hotelsRouter.get("/", getHotels)
hotelsRouter.post('/', validate, postHotelHandler)

hotelsRouter.get('/:id', getHotelIdHandler);

hotelsRouter.put("/:id", putHotelHandler)

hotelsRouter.delete("/:id", deleteHotelHandler)
module.exports = hotelsRouter