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
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'client',
      validate: {
        isIn: {
          args: [['admin', 'client']],
        }
      }
    },  
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date:{
      type: DataTypes.STRING,
      allowNull: true
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_picture:{
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number:{
      type: DataTypes.STRING,
      allowNull: true
    },
    nationality:{
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {paranoid: true,}
  );
};
