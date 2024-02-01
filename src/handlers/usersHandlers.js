const { getUsers, deleteUsers} = require('../controllers/usersControllers');

const getUsersHandler = async (req, res) => {

    try{
        const users = await getUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const deleteUsersHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUsers(id);
        res.status(200).json({message: "Delete sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getUsersHandler,
    deleteUsersHandler
}