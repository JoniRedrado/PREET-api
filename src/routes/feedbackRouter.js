const { Router } = require("express");
const feedbackRouter = Router();
const { getFeedbacksHandler,
    getFeedbacksUserHandler,
    getFeedbacksHotelHandler,
    postFeedbackHandler, 
    putFeedbackHandler,
    deleteFeedbackHandler} = require('../handlers/feedbackHandlers');
const verifyToken = require('../utils/verifyToken');

//Endpoints
feedbackRouter.get('/', getFeedbacksHandler);
feedbackRouter.get('/user', verifyToken, getFeedbacksUserHandler);
feedbackRouter.get('/hotel/:id', getFeedbacksHotelHandler);
feedbackRouter.post('/:hotelId', verifyToken, postFeedbackHandler);
feedbackRouter.put('/update/:id', verifyToken, putFeedbackHandler);
feedbackRouter.delete('/delete/:id', verifyToken, deleteFeedbackHandler);

module.exports = feedbackRouter