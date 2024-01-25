const { Country } = require('../../db.js');

const getCountries = async () => {
    let countries = await Country.findAll();
    return countries.map(country => country.name);
}

module.exports = {
    getCountries
}