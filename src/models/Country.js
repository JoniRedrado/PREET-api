const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('country', {
    id_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
      },
  },
  {timestamps: false,}
  );
};
