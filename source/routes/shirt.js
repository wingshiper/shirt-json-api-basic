const express = require('express')
const routes = express.Router()
const {
    getAll,
    getOne,
    create,
    update,
    deleteShirt
} = require('../controller/ShirtController')



routes.get('/',getAll)
routes.post('/create',create)
routes.get('/:id',getOne)
routes.patch('/:id/update',update)
routes.delete('/:id/delete',deleteShirt)







module.exports = routes