const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('hotel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {timestamps: false,}
  );
};
