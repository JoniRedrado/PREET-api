const { Router } = require('express');
const hotelsRouter = Router();
const {validate} = require ("../utils/validatePost")
const { getHotelIdHandler, postHotelHandler, getHotelsHandler, putHotelHandler, deleteHotelHandler } = require('../handlers/hotelsHandlers');

//Endpoints

hotelsRouter.post('/', validate, postHotelHandler)

hotelsRouter.get('/detail/:id', getHotelIdHandler);
hotelsRouter.get('/', getHotelsHandler)

hotelsRouter.put("/:id", validate, putHotelHandler)

hotelsRouter.delete("/:id", deleteHotelHandler)

module.exports = hotelsRouter