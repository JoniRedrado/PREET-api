const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

//Metadata info about our API

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'PREET API', version: '1.0.0'},
    },
    apis: ['./src/routes.js']
}

//DOC EN JSON FORMAT
const swaggerSpec = swaggerJSDoc(options)

//Function to setup our docs
const swaggerDocs = (app, port)=>{
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get('/api/docs.json', (req, res) =>{
        res.setHeaders('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log('API docs are availale at http://localhost:3001/api/docs');
}

module.exports = { swaggerDocs }