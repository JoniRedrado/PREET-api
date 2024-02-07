const { DataTypes } = require('sequelize');
const typeRooms = require('../utils/constants/typeRooms.js');

module.exports = (sequelize) => {

  sequelize.define('room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: typeRooms[0],
      validate: {
        isIn: {
          args: [typeRooms],
        }
      }
    },
    numeration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {paranoid: true,}
  );
};
