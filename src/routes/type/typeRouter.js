const { Router } = require('express')
const typeRouter = Router()

const getTypes = require('./getTypes')

typeRouter.get('/', getTypes)

module.exports = typeRouter