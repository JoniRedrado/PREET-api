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
    stars: {
      type: DataTypes.INTEGER,
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
    ranting: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {paranoid: true,}
  );
};
