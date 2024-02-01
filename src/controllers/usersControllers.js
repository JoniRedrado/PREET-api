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
module.exports = {
    getUsers,
    deleteUsers
}