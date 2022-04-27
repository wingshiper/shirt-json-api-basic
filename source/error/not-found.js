const customError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends customError {
    constructor(message,statuscode)
    {
        super(message)
        this.statuscode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError