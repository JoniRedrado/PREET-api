const { Router } = require('express');
const hotelsRouter = Router();
const verifyToken = require('../utils/verifyToken');
const {validate} = require ("../utils/validatePost")
const { getHotelsHandler, 
    getHotelIdHandler,
    getHotelRangingHandler, 
    postHotelHandler, 
    putHotelHandler, 
    deleteHotelHandler } = require('../handlers/hotelsHandlers');

//Endpoints
hotelsRouter.get('/', getHotelsHandler)
hotelsRouter.get('/detail/:id', getHotelIdHandler);
hotelsRouter.get('/range', getHotelRangingHandler);
hotelsRouter.post('/', validate, verifyToken, postHotelHandler)
hotelsRouter.put("/:id", validate, putHotelHandler)
hotelsRouter.delete("/:id", verifyToken, deleteHotelHandler)

module.exports = hotelsRouter