const { Router } = require("express");
const roomsRouter = Router();
const { getRoomsHandler,
    getRoomIdHandler, 
    postRoomsHandler,
    putRoomsHandler,
    deleteRoomsHandler,
    getRoomsDeletedHandler,
    restoreRoomsHandler,
    getTypeRooms} = require('../handlers/roomsHandlers');
const verifyToken = require('../utils/verifyToken');
const verifyAdmin = require('../utils/verifyAdmin');

//Endpoints
roomsRouter.get('/:id', getRoomsHandler);
roomsRouter.get('/types', getTypeRooms);
roomsRouter.get('/detail/:id', getRoomIdHandler);
roomsRouter.post('/:hotelId', verifyToken, verifyAdmin, postRoomsHandler);
roomsRouter.put('/update/:id', verifyToken, verifyAdmin, putRoomsHandler);
roomsRouter.delete('/:id', verifyToken, verifyAdmin, deleteRoomsHandler);
roomsRouter.get('/deleted', verifyToken, verifyAdmin, getRoomsDeletedHandler);
roomsRouter.put('/restore', verifyToken, verifyAdmin, restoreRoomsHandler);

module.exports = roomsRouter