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

//Endpoints
roomsRouter.get('/', getRoomsHandler);
roomsRouter.get('/types', getTypeRooms);
roomsRouter.get('/detail/:id', getRoomIdHandler);
roomsRouter.post('/', postRoomsHandler);
roomsRouter.put('/update/:id', putRoomsHandler);
roomsRouter.delete('/:id', deleteRoomsHandler);
roomsRouter.get('/deleted', getRoomsDeletedHandler);
roomsRouter.put('/restore', restoreRoomsHandler);

module.exports = roomsRouter