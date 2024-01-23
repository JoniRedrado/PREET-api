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
{timestamps: false,}
);

const Country = sequelize.define('country', {
	id_name: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true
		},
},
{timestamps: false,}
);

// Define las relaciones entre Hotel y Country
Hotel.belongsTo(Country);
Country.hasMany(Hotel);

// Función para insertar países y hoteles
const seedData = async () => {
  try {
    // Sincroniza los modelos con la base de datos
    await sequelize.sync();

    // Inserta 10 países de América Latina
    const latinAmericanCountries = ['Argentina', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Mexico', 'Peru', 'Uruguay', 'Venezuela', 'Paraguay'];
    //await Country.bulkCreate(latinAmericanCountries.map(country => ({ id_name: country })));

    // Inserta 2 hoteles por cada país
    for (const countryName of latinAmericanCountries) {
      const country = await Country.findOne({ where: { id_name: countryName } });
			console.log(country.dataValues.id_name);
      await Hotel.bulkCreate([
        {
          name: `Hotel ${countryName} 1`,
          address: `Address 1, ${countryName}`,
          address_url: `URL 1, ${countryName}`,
          price: 100,
          email: `hotel1@${countryName.toLowerCase()}.com`,
          image: `image1_${countryName.toLowerCase()}.jpg`,
          country: country.dataValues.id_name,
        },
        {
          name: `Hotel ${countryName} 2`,
          address: `Address 2, ${countryName}`,
          address_url: `URL 2, ${countryName}`,
          price: 150,
          email: `hotel2@${countryName.toLowerCase()}.com`,
          image: `image2_${countryName.toLowerCase()}.jpg`,
          country: country.dataValues.id_name,
        },
      ]);
    }

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
