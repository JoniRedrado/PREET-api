const { getUsers } = require('../controllers/usersControllers');

const getUsersHandler = async (req, res) => {

    try{
        const users = await getUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getUsersHandler
}