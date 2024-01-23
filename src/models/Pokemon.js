const { DataTypes } = require('sequelize');
const { v4: uuidv4} = require('uuid')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    velocidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
