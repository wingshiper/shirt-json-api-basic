const customError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UnauthorizedError extends customError {
    constructor(message,statuscode)
    {
        super(message)
        this.statuscode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError