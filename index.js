const server = require('./app.js');
const { Hotel, Country, conn } = require('./db.js');
const arrayHotels = require('./src/utils/hotels.js');
const arrayCountries = require('./src/utils/countries.js');
const { PORT } = process.env

conn.sync({ force: true }).then(() => {
  Country.findAll().
  then(response => {
    if(response.length === 0) 
      Country.bulkCreate(arrayCountries)
      .then(response => {
        Hotel.findAll()
        .then(response => {
          if(response.length === 0) Hotel.bulkCreate(arrayHotels);
        })
      })
      .catch(error => {
        console.log(error.message);
      })
  })

  server.listen(PORT, () => {
    console.log('%s listening at', PORT);
  });
});
