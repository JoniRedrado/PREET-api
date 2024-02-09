const { Router } = require('express');
const hotelsRouter = Router();
const verifyToken = require('../utils/verifyToken');
const verifyAdmin = require('../utils/verifyAdmin');
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
hotelsRouter.post('/', validate, verifyToken, verifyAdmin, postHotelHandler)
hotelsRouter.put("/:id", validate, verifyToken, verifyAdmin, putHotelHandler)
hotelsRouter.delete("/:id", verifyToken, verifyAdmin, deleteHotelHandler)

module.exports = hotelsRouter