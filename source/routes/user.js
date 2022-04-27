const express = require('express')
const routes = express.Router()
const { login, register} = require('../controller/UserController')


routes.post('/login',login)
routes.post('/register',register)


module.exports = routes