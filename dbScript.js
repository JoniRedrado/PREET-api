const { Sequelize, DataTypes } = require('sequelize');

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

    // Inserta países
    const countries = await Country.bulkCreate([
      { name: 'Argentina' },
      { name: 'Brazil' },
      // Agrega más países según sea necesario
    ]);

    // Inserta hoteles asociados a los países
    await Hotel.bulkCreate([
      {
        name: 'Hotel Buenos Aires',
        address: '123 Main St, Buenos Aires',
        address_url: 'https://www.example.com/hotel-buenos-aires',
        price: 150.00,
        email: 'info@hotelbuenosaires.com',
        image: 'hotel_buenos_aires.jpg',
        countryId: countries[0].id, // Asocia el hotel con Argentina
      },
      {
        name: 'Hotel Rio de Janeiro',
        address: '456 Beach Ave, Rio de Janeiro',
        address_url: 'https://www.example.com/hotel-rio-de-janeiro',
        price: 200.00,
        email: 'info@hotelriodejaneiro.com',
        image: 'hotel_rio_de_janeiro.jpg',
        countryId: countries[1].id, // Asocia el hotel con Brazil
      },
      // Agrega más hoteles según sea necesario
    ]);

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
