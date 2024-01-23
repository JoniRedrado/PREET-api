const axios = require("axios");
const { Pokemon } = require("../../db.js");

module.exports = (req, res) => {
    var pokemons = [];

    axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=60")
        .then(async ({ data }) => {
            async function getPokemonDetails(url) {
                try {
                    await axios.get(url).then(({ data }) => {
                        const pokemon = {
                            id: data.id,
                            nombre: data.name,
                            imagen: data.sprites.other["official-artwork"].front_default,
                            vida: data.stats[0].base_stat,
                            ataque: data.stats[1].base_stat,
                            defensa: data.stats[2].base_stat,
                            velocidad: data.stats[5].base_stat,
                            altura: data.height,
                            peso: data.weight,
                            tipos: data.types,
                        };
                        pokemons.push(pokemon);
                    });
                } catch (error) {
                    console.error(error);
                }
            }

            async function getAllPokemons(pokemonsArray) {
                for (const pokemon of pokemonsArray) {
                    await getPokemonDetails(pokemon.url);
                }
            }

            async function getDbPokemons (){

                await Pokemon.findAll();
        
                const dbPokemons = await Pokemon.findAll();
                if (dbPokemons === 0) {
                    return;
                } else {
                    await dbPokemons.forEach((dbPokemon) => {
                        Pokemon.findOne({where: {id: dbPokemon.id}})
                            .then(dbPokemon=>{
                                dbPokemon.getTypes()
                                    .then(types=>{
                                        dbPokemon.dataValues.tipos = types
                                        pokemons.push(dbPokemon)
                                    })
                                    .catch(error=>{
                                        console.error("Couldn't find pokemon types.");
                                    })
                            })
                            .catch(error=>{
                                console.error(error)
                            })
                    });
                }
            }
            await getDbPokemons();
            await getAllPokemons(data.results);
            res.status(200).json(pokemons);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error when searching for the requested pokemons");
        });
};
