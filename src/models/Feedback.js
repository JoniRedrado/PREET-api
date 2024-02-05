const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('feedback', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {paranoid: true,}
  );
};
