const validateUser = (req, res, next) =>{

    const { name, last_name, email, password} = req.body
    if(!name) return res.status(400).json({error: "Missing name"})
    if(!last_name) return res.status(400).json({error: "Missing last_name"})
    if(!email) return res.status(400).json({error: "Missing email"})
    if(!password) return res.status(400).json({error: "Missing password"})
    next();
} 
module.exports = {validateUser} 