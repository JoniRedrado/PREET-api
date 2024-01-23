const { getCountries } = require('../controllers/countriesControllers');

const getCountriesHandler = async (req, res) => {
    try{
        const countries = await getCountries();
        res.status(200).json(countries);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getCountriesHandler
}