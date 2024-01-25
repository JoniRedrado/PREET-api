const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false });
};
