const { Router } = require('express');
// Importar todos los routers;
const hotelsRouter = require("./hotelsRouter")
const countriesRouter = require("./countriesRouter")
const router = Router();

// Configurar los routers
router.use("/hotels", hotelsRouter)
router.use("/countries", countriesRouter)


module.exports = router;
