const { Router } = require('express');
const hotelsRouter = Router();
const {validate} = require ("../utils/validatePost")
const { getHotelIdHandler, postHotelHandler, getHotelsHandler, putHotelHandler, deleteHotelHandler } = require('../handlers/hotelsHandlers');
const verifyToken = require('../utils/verifyToken');

//Endpoints

hotelsRouter.post('/', validate, verifyToken, postHotelHandler)

hotelsRouter.get('/detail/:id', getHotelIdHandler);
hotelsRouter.get('/', getHotelsHandler)

hotelsRouter.put("/:id", validate, putHotelHandler)

hotelsRouter.delete("/:id", verifyToken, deleteHotelHandler)

module.exports = hotelsRouter