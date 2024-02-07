const { User } = require('../../db.js');

const getUsers = async () => {
    let users = await User.findAll();
    return users
}
const deleteUsers = async (id) => {
    const userToDelete = await User.findByPk(id);
    const deletedUser = await userToDelete.destroy()

    return deletedUser;
}

const getUserInfo = async (id) => {
    try {
        const user = await User.findByPk(id, {
            attributes: {exclude:["id", "password", "createdAt", "updatedAt", "deletedAt", "rol", "countryId", "profile_picture", "email"]}
        });
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUserInfo = async (userId, updatedUserInfo) => {
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new Error('User not found.');
      }

      await user.update(updatedUserInfo);
  
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
  
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
module.exports = {
    getUsers,
    deleteUsers,
    getUserInfo,
    updateUserInfo
}