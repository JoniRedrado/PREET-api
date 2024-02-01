const { Router } = require('express');
const softRouter = Router();
const { HotelsDeleteSoftHandler,restoreHotelHandler,UsersDeleteSoftHandler,restoreUserHandler} = require('../handlers/softHandlers');
const verifyToken = require('../utils/verifyToken');

softRouter.get('/deleteHotels', HotelsDeleteSoftHandler);

softRouter.put("/restoreHotels", restoreHotelHandler)

softRouter.get('/deleteUsers', UsersDeleteSoftHandler);

softRouter.put("/restoreUsers", restoreUserHandler)

module.exports = softRouter