const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false });
};
