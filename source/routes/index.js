const User = require('./user')
const Shirt = require('./shirt')
const authMiddlerware  = require('../middlerware/auth')
const routes = (app) => {
   app.use('/api/user',User)
   app.use('/api/shirt',authMiddlerware,Shirt)
}


module.exports = routes;