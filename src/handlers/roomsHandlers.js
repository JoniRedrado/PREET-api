const { getRooms, postRoom} = require('../controllers/roomsControllers');

const getRoomsHandler = async (req, res) => {
    try{
        const rooms = await getRooms();
        res.status(200).json(rooms);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const postRoomsHandler = async (req, res) => {
    const roomData = req.body;
    try{
        const room = await postRoom(roomData);
        res.status(200).json(room);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getRoomsHandler,
    postRoomsHandler
}