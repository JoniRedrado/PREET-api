const { Router } = require('express');
const pokemonRouter = Router();

const getPokemons = require('./getPokemons')
const getPokemonById = require ('./getPokemonById')
const postNewPokemon = require('./postNewPokemon');
const getPokemonByName = require('./getPokemonByName');
const deletePokemon = require('./deletePokemon');

pokemonRouter.get('/', getPokemons)
pokemonRouter.post('/', postNewPokemon)
pokemonRouter.get('/:id', getPokemonById)
pokemonRouter.get('/search/name', getPokemonByName)
pokemonRouter.delete('/', deletePokemon)

module.exports = pokemonRouter;