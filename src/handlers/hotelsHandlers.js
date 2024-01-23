const { getHotelById, postHotel } = require('../controllers/hotelsControllers.js');

const getHotelIdHandler = async (req, res) => {
    const { id } = req.params;

    try{
        const hotel = await getHotelById(id);
        res.status(200).json(hotel);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

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
    getHotelIdHandler,
    postHotelHandler
}
