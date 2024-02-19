const { Router } = require("express");
const metricsRouter = Router();

const { metricUsersHandler, 
    metricIncomesHotelsHandler,
    metricNetIncomeHandler, 
    metricBookingsHotelsHandler,
    metricRankingHandler} = require('../handlers/metricsHandlers');

//Endpoints
metricsRouter.get('/users', metricUsersHandler);
metricsRouter.get('/incomes', metricIncomesHotelsHandler);
metricsRouter.get('/netIncome', metricNetIncomeHandler);
metricsRouter.get('/ranking', metricRankingHandler);
metricsRouter.get('/bookings', metricBookingsHotelsHandler);

module.exports = metricsRouter