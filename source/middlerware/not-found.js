const notFoundMiddlerware =  (req, res, next) => {
    res.status(404).send('Route is not exist')
}


module.exports = notFoundMiddlerware