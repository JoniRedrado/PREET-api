const { Router } = require("express");
const itemsRouter = Router();
const { getItemsHandler} = require('../handlers/itemsHandlers.js');

itemsRouter.get('/', getItemsHandler);

module.exports = itemsRouter