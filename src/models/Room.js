const { DataTypes } = require('sequelize');
const { roomsType } = require('../utils/constants/typeRooms.js');

module.exports = (sequelize) => {

  sequelize.define('room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: roomsType[0],
      validate: {
        isIn: {
          args: [roomsType],
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
    guest: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {paranoid: true,}
  );
};
