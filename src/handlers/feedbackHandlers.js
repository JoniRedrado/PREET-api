const { getFeedbacks,
    getFeedbacksUser,
    getFeedbacksHotel,
    postFeedback,
    putFeedback,
    deleteFeedback} = require('../controllers/feedbackControllers');

const getFeedbacksHandler = async (req, res) => {
    try{
        const feedbacks = await getFeedbacks();
        res.status(200).json(feedbacks);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const getFeedbacksUserHandler = async (req, res) => {
    const { userId } = req.body;
    // const { id } = req.user;
    try{
        const feedbacks = await getFeedbacksUser(userId);
        res.status(200).json(feedbacks);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const getFeedbacksHotelHandler = async (req, res) => {
    const { hotelId } = req.body;
    // const { id } = req.params;
    try{
        const feedbacks = await getFeedbacksHotel(hotelId);
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
const deleteFeedbackHandler = async (req, res) => {
    // const { id } = req.params;
    const { id } = req.body;
    try{
        const feedback = await deleteFeedback(id);
        res.status(200).json({message: "Delete sucess"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
module.exports = {
    getFeedbacksHandler, 
    getFeedbacksUserHandler,
    getFeedbacksHotelHandler,
    postFeedbackHandler,
    putFeedbackHandler,
    deleteFeedbackHandler
}