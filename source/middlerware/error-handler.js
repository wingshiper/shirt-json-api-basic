const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddlerware = function (err,req, res,next)  {
   
    let customError = {
        statusCode: err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }
    if ( err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
            .map(item => item.message)
            .join(' , ')
        customError.statusCode = 400
    }

    if ( err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
      customError.msg = `No item found with id : ${err.value}`
      customError.statusCode = 404
    // return res.status(500).json({err})
    return res.status(customError.statusCode).json({ msg: customError.msg })


}
}
module.exports = errorHandlerMiddlerware    