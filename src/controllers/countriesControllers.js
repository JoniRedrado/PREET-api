const { Country } = require('../../db.js');
const arrayCountries = require('../utils/countries.js');

const getCountries = async () => {
    let countries = await Country.findAll();

    if(countries.length === 0)
        countries = await Country.bulkCreate(arrayCountries);
    
    return countries.map(country => country.name);
}

module.exports = {
    getCountries
}