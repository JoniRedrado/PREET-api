const axios = require('axios')
const jwt = require('jsonwebtoken')
const {config} = require('dotenv')
config()
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY, PAYPAL_API, SECRET_KEY, FRONT_URL, BACK_URL } = process.env
const { Booking } = require('../../db.js')
const { getBookingUserLast } = require('../controllers/bookingsControllers.js')

const createOrder = async (req, res) => {

    const {price, dateInit, dateFinal, roomId} = req.body
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const userData = jwt.verify(token, SECRET_KEY)

    const nights = Math.ceil(Math.abs(new Date(dateFinal).getTime() - new Date(dateInit).getTime()) / (1000 * 60 * 60 * 24))
    const amount = nights * price
    const commission = (amount * 0.054) + 0.30

    console.log(amount);

    //Orden a generar, deben venir datos desde el front
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
                //Se puede agregar toda la info de la reserva
                description: `Reserva de tu habitacion.`
            }
        ],
        application_context: {
            brand_name: "Preet",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${BACK_URL}/payment/capture-order/${userData.id}`,
            //Cambiar para volver al detalle del hotel
            cancel_url: `${BACK_URL}/payment/cancel-order/${userData.id}`
        }
    }

    //Generar el token
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY
        }
    })

    //Generar la orden
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'     
        }
    })

    //Create booking - modificar para que quede como pago pendiente y cambiarlo cuando se ejecute el pago
    // o generar la booking recien cuando se complete el pago
    const newBooking = await Booking.create({dateInit, dateFinal, pay: "Pending", roomId, userId:userData.id, nights, amount, commission})

    //Devolver la orden
    res.json(response.data)
}

const captureOrder = async (req, res) => {
    const { id } = req.params
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY
        }
    })

    const bookingToUpdate = await getBookingUserLast(id)

    const updateBooking = await bookingToUpdate.update({pay: response.data.id})
    console.log(updateBooking);
    res.redirect(`${FRONT_URL}/booked`)
    //res.json(response.data)
}

const cancelPayment = async (req, res) => {
    const { id } = req.params
    
    const canceledBooking = await getBookingUserLast(id)

    const deletedBooking = await canceledBooking.destroy({force: true});
    
    res.redirect(`${FRONT_URL}/`)
}

module.exports = {
    createOrder,
    captureOrder,
    cancelPayment}