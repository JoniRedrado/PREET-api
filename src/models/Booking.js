const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dateInit: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateFinal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pay: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commission: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    nights:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount:{
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  },
  { paranoid: true }
  );
  return Booking;
};