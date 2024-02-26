const { URI_MONGO, DB_USER_MONGO, DB_PASSWORD_MONGO } = process.env;
const mongoose = require('mongoose');

const conn = () =>
    mongoose.connect(`mongodb+srv://${DB_USER_MONGO}:${DB_PASSWORD_MONGO}@${URI_MONGO}`);

module.exports = conn;