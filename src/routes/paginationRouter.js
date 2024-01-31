const { Router } = require("express");
const itemsRouter = Router();
const { getItemsHandler} = require('../handlers/paginationHandlers.js');

itemsRouter.get('/', getItemsHandler);

module.exports = itemsRouter