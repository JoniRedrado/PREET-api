require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const dbConnection= process.env.DB_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/PREET`
const sequelize = new Sequelize(
   dbConnection, 
   {
      logging: false,
      native: false,
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, 'src/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, 'src/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// Cambiar modelos por los nuestros!
const { Country, Hotel, User, Feedback, Booking, Room, HotelImages, Favorite } = sequelize.models;

// Aca vendrian las relaciones
Hotel.belongsTo(Country);
Country.hasMany(Hotel);
Hotel.hasMany(Feedback) ;
Feedback.belongsTo(Hotel);
Hotel.hasMany(Room);
Room.belongsTo(Hotel);
Hotel.hasMany(HotelImages, {as: 'image'});
HotelImages.belongsTo(Hotel);
Country.hasMany(User)
User.belongsTo(Country)
User.hasMany(Feedback)
Feedback.belongsTo(User)
User.hasMany(Booking)
Booking.belongsTo(User)
Room.hasMany(Booking)
Booking.belongsTo(Room)
User.hasMany(Favorite)
Favorite.belongsTo(User)
Hotel.hasMany(Favorite)
Favorite.belongsTo(Hotel)

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
