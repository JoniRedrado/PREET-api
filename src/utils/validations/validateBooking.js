const validatePostBooking = (req, res, next) =>{

    const { dateInit, dateFinal, pay} = req.body
    const userId = req.user.id
    const roomId = req.params.id

    if(!dateInit) return res.status(400).json({error: "Missing dateInit"})
    if(!dateFinal) return res.status(400).json({error: "Missing dateFinal"})
    if(!pay) return res.status(400).json({error: "Missing pay"})
    if(!userId) return res.status(400).json({error: "Missing userId"})
    if(!roomId) return res.status(400).json({error: "Missing roomId"})

    next();
} 
const validatePutBooking = (req, res, next) =>{

    const { dateInit, dateFinal, pay} = req.body
    const {roomId} = req.params

    if(!dateInit) return res.status(400).json({error: "Missing dateInit"})
    if(!dateFinal) return res.status(400).json({error: "Missing dateFinal"})
    if(!pay) return res.status(400).json({error: "Missing pay"})
    if(!roomId) return res.status(400).json({error: "Missing roomId"})

    next();
} 
module.exports = {
    validatePostBooking,
    validatePutBooking
}