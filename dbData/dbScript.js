const { Sequelize, DataTypes } = require('sequelize');
const { hotelsData } = require('./hotels')

// Configura tu conexión a la base de datos
const sequelize = new Sequelize('PREET', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define los modelos Hotel y Country
const Hotel = sequelize.define('hotel', {
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
{ timestamps: false });

const Country = sequelize.define('country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{ timestamps: false });

// Define la relación entre Hotel y Country
Hotel.belongsTo(Country);
Country.hasMany(Hotel);

// Función para insertar registros de ejemplo
const seedData = async () => {
  try {
    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ force: true });

    // Inserta países de América Latina
    const latinAmericanCountries = ['Argentina', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Mexico', 'Peru', 'Uruguay', 'Venezuela', 'Paraguay'];
    const countries = await Country.bulkCreate(latinAmericanCountries.map(country => ({ name: country })));
    
    const hotels = await Hotel.bulkCreate(hotelsData);


    console.log('Datos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    // Cierra la conexión a la base de datos
    await sequelize.close();
  }
};

// Ejecuta la función para insertar datos
seedData();
