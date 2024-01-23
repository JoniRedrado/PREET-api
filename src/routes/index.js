const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('./pokemon/pokemonRouter.js')
const typeRouter = require('./type/typeRouter.js')

const router = Router();

// Configurar los routers
router.use("/pokemon", pokemonRouter)
router.use('/types', typeRouter)


module.exports = router;
