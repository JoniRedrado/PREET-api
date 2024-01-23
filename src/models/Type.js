const {DataTypes, Sequelize} = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(), // Asigna un valor UUID por defecto al crear un nuevo registro
            allowNull: false,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};