const { Router } = require('express');
const softRouter = Router();
const { HotelsDeleteSoftHandler,restoreHotelHandler,UsersDeleteSoftHandler,restoreUserHandler} = require('../handlers/softHandlers');
const verifyToken = require('../utils/verifyToken');
const verifyAdmin = require('../utils/verifyAdmin');

softRouter.get('/deleteHotels', verifyToken, verifyAdmin, HotelsDeleteSoftHandler);

softRouter.put("/restoreHotels", verifyToken, verifyAdmin, restoreHotelHandler)

softRouter.get('/deleteUsers', verifyToken, verifyAdmin, UsersDeleteSoftHandler);

softRouter.put("/restoreUsers", verifyToken, verifyAdmin, restoreUserHandler)

module.exports = softRouter