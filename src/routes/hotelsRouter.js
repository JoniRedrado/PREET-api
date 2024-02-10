const { Router } = require('express');
const hotelsRouter = Router();
const verifyToken = require('../utils/verifications/verifyToken');
const verifyAdmin = require('../utils/verifications/verifyAdmin');
const {validateHotel} = require ("../utils/validations/validateHotel")
const { getHotelsHandler, 
    getHotelIdHandler,
    getHotelRangingHandler, 
    postHotelHandler, 
    putHotelHandler, 
    deleteHotelHandler,
    getHotelsDeletedHandler,
    restoreHotelHandler} = require('../handlers/hotelsHandlers');

//Endpoints
hotelsRouter.get('/', getHotelsHandler)
hotelsRouter.get('/detail/:id', getHotelIdHandler);
hotelsRouter.get('/range', getHotelRangingHandler);
hotelsRouter.post('/', verifyToken, verifyAdmin, validateHotel, postHotelHandler)
hotelsRouter.put("/:id", verifyToken, verifyAdmin, validateHotel, putHotelHandler)
hotelsRouter.delete("/:id", verifyToken, verifyAdmin, deleteHotelHandler)
hotelsRouter.get("/deleted", verifyToken, verifyAdmin, getHotelsDeletedHandler)
hotelsRouter.put("/restore/:id", verifyToken, verifyAdmin, restoreHotelHandler)

module.exports = hotelsRouter