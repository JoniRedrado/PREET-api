const { getHotelById } = require('../controllers/hotelsControllers');

const getHotelIdHandler = async (req, res) => {
    const { id } = req.params;

    try{
        const hotel = await getHotelById(id);
        res.status(200).json(hotel);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getHotelIdHandler
}
