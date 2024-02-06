const axios = require('axios')
const jwt = require('jsonwebtoken')
const {config} = require('dotenv')
config()
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY, PAYPAL_API, SECRET_KEY } = process.env
const { Booking } = require('../../db.js')

const createOrder = async (req, res) => {

    console.log(req.body);
    const {price, dateInit, dateFinal, user, roomId} = req.body
    const userData = jwt.verify(user, SECRET_KEY)

    //Orden a generar, deben venir datos desde el front
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: price,
                },
                //Se puede agregar toda la info de la reserva
                description: "Reserva de una habitacion (info de la habitacion)"
            }
        ],
        application_context: {
            brand_name: "Preet",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http://localhost:5173/booked",
            //Cambiar para volver al detalle del hotel
            cancel_url: "http://localhost:5173/"
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

    //Create booking
    const newBooking = await Booking.create({dateInit, dateFinal, pay: response.data.id, roomId, userId:userData.id})

    //Devolver la orden
    res.json(response.data)
}

const captureOrder = async (req, res) => {

    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY
        }
    })

    //res.redirect(200, 'http://localhost:5173')
    res.json(response.data)
}

const cancelPayment = async (req, res) => {
    
}

module.exports = {
    createOrder,
    captureOrder,
    cancelPayment}