const { getRooms, 
    getRoomByType,
    getRoomNumeration,
    getRoomId,
    postRoom,
    putRoom,
    deleteRoom,
    getRoomsDeleted, 
    restoreRoom} = require('../controllers/roomsControllers');

const typeRooms = require('../utils/constants/typeRooms');

const getRoomsHandler = async (req, res) => {
    const {type, numeration} = req.query;

    try{
        if(type){
            const roomType = await getRoomByType(type);
            res.status(200).json(roomType);
        }else if(numeration){
            const roomNumeration = await getRoomNumeration(numeration);
            res.status(200).json(roomNumeration);
        }
        else {
            const roomsAll = await getRooms();
            res.status(200).json(roomsAll);
        }
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getRoomIdHandler = async (req, res) => {
    const {id} = req.params;
    try{
        const room = await getRoomId(id);
        res.status(200).json(room);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const postRoomsHandler = async (req, res) => {
    const roomData = req.body;
    const {hotelId} = req.params;
    try{
        const room = await postRoom(roomData, hotelId);
        res.status(200).json(room);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const putRoomsHandler = async (req, res) => {
    const {id} = req.params;
    const roomData = req.body;
    try{
        const room = await putRoom(id, roomData);
        res.status(200).json(room);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const deleteRoomsHandler = async (req, res) => {
    const {id} = req.params;
    try{
        const room = await deleteRoom(id);
        res.status(200).json({message: "Delete sucess"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const getRoomsDeletedHandler = async (req, res) => {
    try{
        const rooms = await getRoomsDeleted();
        res.status(200).json(rooms);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const restoreRoomsHandler = async (req, res) => {
    const {id} = req.params;
    try{
        const room = await restoreRoom(id);
        res.status(200).json({message: "restore sucess"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getTypeRooms = (req, res) => {
    res.status(200).json(typeRooms);
}

module.exports = {
    getRoomsHandler,
    getRoomIdHandler,
    postRoomsHandler,
    putRoomsHandler,
    deleteRoomsHandler,
    getRoomsDeletedHandler,
    restoreRoomsHandler,
    getTypeRooms
}