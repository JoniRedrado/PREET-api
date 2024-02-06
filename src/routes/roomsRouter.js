const { Router } = require("express");
const roomsRouter = Router();
const { getRoomsHandler,
    getRoomIdHandler, 
    postRoomsHandler,
    putRoomsHandler,
    deleteRoomsHandler,
    getRoomsDeletedHandler,
    restoreRoomsHandler} = require('../handlers/roomsHandlers');

//Endpoints
roomsRouter.get('/', getRoomsHandler);
roomsRouter.get('/detail/:id', getRoomIdHandler);
roomsRouter.post('/', postRoomsHandler);
roomsRouter.put('/update/:id', putRoomsHandler);
roomsRouter.delete('/:id', deleteRoomsHandler);
roomsRouter.get('/deleted', getRoomsDeletedHandler);
roomsRouter.put('/restore', restoreRoomsHandler);

module.exports = roomsRouter