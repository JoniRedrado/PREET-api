const axios = require('axios')

const { Type } = require('../../db.js')

module.exports = async ( req, res ) => {
    //Find all pokemon types from the db
    const dbTypes = await Type.findAll({
        attributes: ['nombre']
    })
    //If db is empty get types from the API and save into db
    if( dbTypes.length == 0 ) {

        axios.get('https://pokeapi.co/api/v2/type/')
            .then( async ({data}) => {
                const apiTypes = data.results

                await apiTypes.forEach( type => {
                    Type.create({ nombre: type.name})
                });

                await Type.findAll();
                
                const dbTypes = await Type.findAll({
                    attributes: ['nombre']
                })
                if (dbTypes.length === 0) {
                    res.status(500).send("We couldn't get the requested types")
                } else {
                    res.status(200).send(dbTypes)
                }

            })
            .catch(error => {
                res.status(500).send("We couldn't get the requested types")
            })

    } else {
        //If types are already on the db send types
        res.status(200).send(dbTypes)
    }

}