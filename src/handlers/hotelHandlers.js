const { postHotel } = require('../controllers/hotelsControllers')

const postHotelHandler = async (req, res)=>{
    //Debe recibir en el body todas las propiedades del hotel, junto con el id del pais
    const hotelData = req.body

    try{
        const createdHotel = await postHotel(hotelData)
        res.status(200).json(createdHotel)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    postHotelHandler
}