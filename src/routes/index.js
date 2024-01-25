const { Router } = require('express');
// Importar todos los routers;
const hotelsRouter = require("./hotelsRouter")
const countriesRouter = require("./countriesRouter")
const itemsRouter = require("./itemsRouter")
const router = Router();

// Configurar los routers
router.use("/hotels", hotelsRouter)
router.use("/countries", countriesRouter)
router.use("/items", itemsRouter)

module.exports = router;
