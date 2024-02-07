const { Country } = require('../../db.js');
const arrayCountries = require('../utils/constants/countries.js');

const getCountries = async () => {
    let countries = await Country.findAll();
    return countries.map(country => country.name);
}

module.exports = {
    getCountries
}