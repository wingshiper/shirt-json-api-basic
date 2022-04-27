const customError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends customError {
    constructor(message,statuscode)
    {
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError