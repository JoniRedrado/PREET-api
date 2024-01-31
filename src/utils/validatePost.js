const validate = (req, res, next) =>{

    const { name, address, stars, address_url, price, email, image, countryId} = req.body
    if(!name) return res.status(400).json({error: "Missing name"})
    if(!address) return res.status(400).json({error: "Missing address"})
    if(!stars) return res.status(400).json({error: "Missing stars"})
    if(!address_url) return res.status(400).json({error: "Missing address_url"})
    if(!price) return res.status(400).json({error: "Missing price"})
    if(!email) return res.status(400).json({error: "Missing email"})
    if(!image) return res.status(400).json({error: "Missing image"})
    if(!countryId) return res.status(400).json({error: "Missing countryId"})
    next();
} 
module.exports = {validate}