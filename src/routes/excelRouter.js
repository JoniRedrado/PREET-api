const { Router } = require("express");
const excelRouter = Router();
//Handlers para cada endpoint
const { generateExcelUserHandler,
     generateExcelIncomesHandler,
     generateExcelBookingsHandler,
     generateExcelRankingsHandler } = require('../handlers/excelHandlers');

//Endpoints
excelRouter.get('/users', generateExcelUserHandler)
excelRouter.get('/incomes', generateExcelIncomesHandler);
excelRouter.get('/bookings', generateExcelBookingsHandler);
excelRouter.get('/rankings', generateExcelRankingsHandler);

module.exports = excelRouter