const {getHotelsDeleteSoft, restoreHotel, getUsersDeleteSoft, restoreUser} = require('../controllers/softControllers.js');

const HotelsDeleteSoftHandler = async (req,res) => {

    try{
        const deletedHotelsAll = await getHotelsDeleteSoft(req.query)
        res.status(200).json(deletedHotelsAll)    
        }
    catch (error) {
      console.error(error)
      res.status(500).json({error: error.message})
    }
};
const restoreHotelHandler = async (req, res)=>{
    const { id } = req.body;

    try {
        const restoreH = await restoreHotel(id);
        res.status(200).json({message: "restore sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const UsersDeleteSoftHandler = async (req,res) => {

    try{
        const deletedUsersAll = await getUsersDeleteSoft(req.query)
        res.status(200).json(deletedUsersAll)    
        }
    catch (error) {
      console.error(error)
      res.status(500).json({error: error.message})
    }
};
const restoreUserHandler = async (req, res)=>{
    const { email } = req.body;

    try {
        const restoreU = await restoreUser(email);
        res.status(200).json({message: "restore sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    HotelsDeleteSoftHandler,
    restoreHotelHandler,
    UsersDeleteSoftHandler,
    restoreUserHandler
};