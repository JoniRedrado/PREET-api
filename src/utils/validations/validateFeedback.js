const validateFeedback = (req, res, next) =>{

    const userId = req.user.id
    const {hotelId} = req.params

    if(!userId) return res.status(400).json({error: "Missing userId "})
    if(!hotelId) return res.status(400).json({error: "Missing hotelId"})
   
    next();
} 

module.exports = {
    validateFeedback,
}