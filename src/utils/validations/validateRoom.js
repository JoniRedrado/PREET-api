const validatePostRoom = (req, res, next) =>{

    const {type, numeration, price, guest, description} = req.body
    const {hotelId} = req.params

    if(!type) return res.status(400).json({error: "Missing type"})
    if(!numeration) return res.status(400).json({error: "Missing numeration"})
    if(!price) return res.status(400).json({error: "Missing price"})
    if(!guest) return res.status(400).json({error: "Missing guest"})
    if(!description) return res.status(400).json({error: "Missing description"})
    if(!hotelId) return res.status(400).json({error: "Missing hotelId"})

    next();
} 
const validatePutRoom = (req, res, next) =>{

    const {type, numeration, price, guest, description} = req.body

    if(!type) return res.status(400).json({error: "Missing type"})
    if(!numeration) return res.status(400).json({error: "Missing numeration"})
    if(!price) return res.status(400).json({error: "Missing price"})
    if(!guest) return res.status(400).json({error: "Missing guest"})
    if(!description) return res.status(400).json({error: "Missing description"})
    
    next();
} 
module.exports = {
    validatePostRoom,
    validatePutRoom
}