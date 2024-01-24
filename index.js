const server = require('./app.js');
const { Hotel, Country, conn } = require('./db.js');
const arrayHotels = require('./src/utils/hotels.js');
const arrayCountries = require('./src/utils/countries.js');


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

  server.listen(3001, () => {
    console.log('%s listening at 3001');
  });
});
