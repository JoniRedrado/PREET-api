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
    }
  },
  { paranoid: true }
  );
  Booking.beforeCreate(async (booking) => {
    const room = await booking.getRoom();
    if (room.stock > 0) {
      room.stock--;
      await room.save();
    } else {
      throw new Error('No hay disponibilidad de habitaciones');
    }
  });
  
  Booking.afterDestroy(async (booking) => {
    const room = await booking.getRoom();
    room.stock++;
    await room.save();
  });
  return Booking;
};