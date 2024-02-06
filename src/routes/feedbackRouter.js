const { Router } = require("express");
const feedbackRouter = Router();

const { getFeedbacksHandler, postFeedbackHandler, putFeedbackHandler } = require('../handlers/feedbackHandlers');

//Endpoints
feedbackRouter.get('/', getFeedbacksHandler);
feedbackRouter.post('/', postFeedbackHandler);
feedbackRouter.put('/update/:id', putFeedbackHandler);

module.exports = feedbackRouter