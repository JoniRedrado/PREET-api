const { validateUser,
    getUsers, 
    getUserProfile,
    postUser,
    putUserProfile,
    deleteUsers,
    getUsersDeleted,
    restoreUser} = require('../controllers/usersControllers');

const loginHandler = async (req, res) => {
    const { email, password, fireBaseAuth = false } = req.body;

    try {
        const login = await validateUser(email, password, fireBaseAuth)
        if (login.token){
            res.status(200).json({token: login.token, user: login.user})
        } else {
            res.status(200).send({message: "Email or password incorrect."})
        }
    } catch (error) {
        res.status(400).send("User not found")
    }
}    

const getUsersHandler = async (req, res) => {
    try{
        const users = await getUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getUserProfileHandler = async (req, res) => {
    const userId = req.user.id;

    try {
        const userInfo = await getUserProfile(userId);
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const postUserHandler = async (req, res) => {
    const userData = req.body
    try {
        const createdUser = await postUser(userData)
        res.status(200).json(createdUser)
    } catch (error) {
        res.status(400).json ({error: error.message})
    }
}
const putUserProfileHandler = async (req, res) => {
    const userId = req.user.id;
    const updatedUserInfo = req.body; 

    try {
      const updatedUser = await putUserProfile(userId, updatedUserInfo);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const deleteUsersHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUsers(id);
        res.status(200).json({message: "Delete sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsersDeletedHandler = async (req,res) => {

    try{
        const deletedUsersAll = await getUsersDeleted(req.query)
        res.status(200).json(deletedUsersAll)    
        }
    catch (error) {
      console.error(error)
      res.status(500).json({error: error.message})
    }
};
const restoreUserHandler = async (req, res)=>{
    const { id } = req.params;

    try {
        const restoreU = await restoreUser(id);
        res.status(200).json({message: "restore sucess"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    loginHandler,
    getUsersHandler,
    getUserProfileHandler,
    postUserHandler,
    putUserProfileHandler,
    deleteUsersHandler,
    getUsersDeletedHandler,
    restoreUserHandler
}