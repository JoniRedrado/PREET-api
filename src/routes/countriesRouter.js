const { Router } = require("express");
const countriesRouter = Router();
const { getCountriesHandler } = require('../handlers/countriesHandlers');
//Handlers para cada endpoint

//Endpoints
//countriesRouter.get("/", getCountries)
countriesRouter.get('/', getCountriesHandler);

module.exports = countriesRouter