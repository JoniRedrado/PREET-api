const { Router } = require("express");
const feedbackRouter = Router();

const { getFeedbacksHandler,
    getFeedbacksUserHandler,
    getFeedbacksHotelHandler,
    postFeedbackHandler, 
    putFeedbackHandler,
    deleteFeedbackHandler} = require('../handlers/feedbackHandlers');

//Endpoints
feedbackRouter.get('/', getFeedbacksHandler);
feedbackRouter.get('/user', getFeedbacksUserHandler);
feedbackRouter.get('/hotel', getFeedbacksHotelHandler);
feedbackRouter.post('/', postFeedbackHandler);
feedbackRouter.put('/update/:id', putFeedbackHandler);
feedbackRouter.delete('/', deleteFeedbackHandler);

module.exports = feedbackRouter