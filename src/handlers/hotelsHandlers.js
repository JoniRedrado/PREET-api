const { getHotels, getHotelById, postHotel, putHotel, deleteHotel, getHotelByName} = require('../controllers/hotelsControllers.js');

const getHotelsHandler = async (req,res) => {
    const {name, page=1, size=6} = req.query

    try{
        if(name){
            const hotelName = await getHotelByName(name, page, size)
            res.status(200).json(hotelName)    
        }else{
            const hotelsAll = await getHotels(page, size)
            res.status(200).json(hotelsAll)    
        }
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

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

const putHotelHandler = async (req, res) => {
    const { id } = req.params;
    const updatedHotelData = req.body;

    try {
        const updatedHotel = await putHotel(id, updatedHotelData);
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteHotelHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedHotel = await deleteHotel(id);
        res.status(200).json({message: "Delete sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getHotelIdHandler,
    postHotelHandler,
    getHotelsHandler,
    putHotelHandler,
    deleteHotelHandler
};