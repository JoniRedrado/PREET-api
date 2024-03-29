const { Router } = require('express');
// Importar todos los routers;
const hotelsRouter = require("./hotelsRouter")
const countriesRouter = require("./countriesRouter")
const itemsRouter = require("./paginationRouter");
const authRouter = require('./authRouter');

const router = Router();

// Configurar los routers
router.use("/hotels", hotelsRouter)
router.use("/countries", countriesRouter)
router.use("/pagination", itemsRouter)
router.use("/auth", authRouter)

module.exports = router;
