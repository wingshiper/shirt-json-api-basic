require('express-async-errors');
// async error

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const dbConnect = require('./source/db/db')
const routes = require('./source/routes/index')
const notFoundMiddleware = require('./source/middlerware/not-found')
const errorHandlerMiddlerware = require('./source/middlerware/error-handler')
// middlerware 

app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json())

routes(app)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddlerware)
const start = async (req, res) => {
    try {
        await dbConnect()
   
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
        }
    catch (err) {

    }
}
start()