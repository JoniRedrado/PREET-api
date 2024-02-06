const { getFeedbacks, postFeedback, putFeedback } = require('../controllers/feedbackControllers');

const getFeedbacksHandler = async (req, res) => {
    try{
        const feedbacks = await getFeedbacks();
        res.status(200).json(feedbacks);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const postFeedbackHandler = async (req, res) => {
    const feedbackData = req.body;
    const { id } = req.body
    // const {id} =  req.user
    // feedbackData.userId = id
    try{
        const feedback = await postFeedback(feedbackData,id);
        res.status(200).json(feedback);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const putFeedbackHandler = async (req, res) => {
    const { id } = req.params;
    const feedbackData = req.body;
    try{
        const feedback = await putFeedback(id, feedbackData);
        res.status(200).json(feedback);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getFeedbacksHandler, 
    postFeedbackHandler,
    putFeedbackHandler
}