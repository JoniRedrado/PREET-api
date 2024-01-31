const { Country } = require('../../db.js');
const arrayCountries = require('../utils/countries.js');

const getCountries = async () => {
    let countries = await Country.findAll();
    return countries.map(country => country.name);
}

module.exports = {
    getCountries
}