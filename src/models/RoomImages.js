const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('roomImages', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        }

    });
};