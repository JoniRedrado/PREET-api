const { User } = require('../../db.js');

const getUsers = async () => {
    let users = await User.findAll();
    return users
}

module.exports = {
    getUsers
}