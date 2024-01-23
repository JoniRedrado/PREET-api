const {Pokemon} = require('../../db.js')

module.exports = ( req, res ) => {
    const { id } = req.body
    console.log(req.body);
    Pokemon.destroy({where: {id: id}})
        .then(delPokemon =>{
            res.status(200).send("Pokemon deleted succesfully")
        })
        .catch(error=>{
            console.error(error);
            res.status(500).send("Error when deleting the requested pokemon")
        })
}