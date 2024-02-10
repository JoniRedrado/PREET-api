const { Router } = require('express');
const router = Router();
// Importar todos los routers;
const hotelsRouter = require("./hotelsRouter")
const countriesRouter = require("./countriesRouter")
const usersRouter = require('./usersRouter');
const roomsRouter = require('./roomsRouter');
const bookingsRouter = require('./bookingsRouter');
const paymentRouter = require('./paymentRouter')
const feedbackRouter = require('./feedbackRouter')
const favoritesRouter = require('./favoritesRouter')

// Configurar los routers
router.use("/hotels", hotelsRouter)
router.use("/countries", countriesRouter)
router.use("/users", usersRouter)
router.use("/rooms", roomsRouter)
router.use("/bookings", bookingsRouter)
router.use("/feedback", feedbackRouter)
router.use("/payment", paymentRouter)
router.use("/favorites", favoritesRouter)

module.exports = router;
