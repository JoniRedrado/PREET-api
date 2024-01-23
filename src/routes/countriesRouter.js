const { Router } = require("express");
const countriesRouter = Router();
//Handlers para cada endpoint
const { getCountriesHandler } = require('../handlers/countriesHandlers');

//Endpoints
//countriesRouter.get("/", getCountries)
countriesRouter.get('/', getCountriesHandler);

module.exports = countriesRouter