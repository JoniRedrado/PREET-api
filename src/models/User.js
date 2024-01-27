const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {

  sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue:()=> uuidv4(),
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  {timestamps: false,}
  );
};
