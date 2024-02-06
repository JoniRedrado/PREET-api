const { Router } = require('express');
const router = Router();
// Importar todos los routers;
const hotelsRouter = require("./hotelsRouter")
const countriesRouter = require("./countriesRouter")
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const roomsRouter = require('./roomsRouter');
const bookingsRouter = require('./bookingsRouter');
const softRouters = require('./softRouter')
const paymentRouter = require('./paymentRouter')
const feedbackRouter = require('./feedbackRouter')

// Configurar los routers
router.use("/hotels", hotelsRouter)
router.use("/countries", countriesRouter)
router.use("/auth", authRouter)
router.use("/users", usersRouter)
router.use("/rooms", roomsRouter)
router.use("/bookings", bookingsRouter)
router.use("/feedback", feedbackRouter)
router.use("/soft", softRouters)
router.use("/payment", paymentRouter)

module.exports = router;
