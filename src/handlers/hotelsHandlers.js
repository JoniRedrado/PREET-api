const { getHotels,
    getHotelByName,
    getHotelById,
    getHotelRanging,
    postHotel, 
    putHotel, 
    deleteHotel,
    getHotelsDeleted,
    restoreHotel } = require('../controllers/hotelsControllers.js');

const getHotelsHandler = async (req,res) => {
    try{
        const hotelName = await getHotels(req.query)
        res.status(200).json(hotelName)    
    } catch (error) {
      console.error(error)
      res.status(500).json({error: error.message})
    }
}

const getHotelIdHandler = async (req, res) => {
    const { id } = req.params;

    try{
        const hotel = await getHotelById(id, req.body);
        res.status(200).json(hotel);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getHotelRangingHandler = async (req, res) => {
    try{
        const hotels = await getHotelRanging();
        res.status(200).json(hotels);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const postHotelHandler = async (req, res)=>{
    //Debe recibir en el body todas las propiedades del hotel, junto con el nombre del pais
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
const getHotelsDeletedHandler = async (req,res) => {

    try{
        const deletedHotelsAll = await getHotelsDeleted(req.query)
        res.status(200).json(deletedHotelsAll)    
        }
    catch (error) {
      console.error(error)
      res.status(500).json({error: error.message})
    }
};
const restoreHotelHandler = async (req, res)=>{
    const { id } = req.params;

    try {
        const restoreH = await restoreHotel(id);
        res.status(200).json({message: "restore sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getHotelIdHandler,
    postHotelHandler,
    getHotelsHandler,
    putHotelHandler,
    deleteHotelHandler,
    getHotelRangingHandler,
    getHotelsDeletedHandler,
    restoreHotelHandler
};