const validatePostFavorite = (req, res, next) =>{

    const {id} = req.user
    const {hotelId} = req.params

    if(!id) return res.status(400).json({error: "Missing user id "})
    if(!hotelId) return res.status(400).json({error: "Missing hotelId"})
   
    next();
} 
const validatePutFavorite = (req, res, next) =>{
    
    const { id } = req.params;

    if(!id) return res.status(400).json({error: "Missing id "})
   
    next();
} 
module.exports = {
    validatePostFavorite,
    validatePutFavorite
}