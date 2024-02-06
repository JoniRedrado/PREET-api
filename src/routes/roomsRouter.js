const { Router } = require("express");
const roomsRouter = Router();
const { getRoomsHandler, postRoomsHandler } = require('../handlers/roomsHandlers');

//Endpoints
roomsRouter.get('/', getRoomsHandler);
roomsRouter.post('/', postRoomsHandler);

module.exports = roomsRouter