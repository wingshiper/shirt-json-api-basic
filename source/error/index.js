const { StatusCodes} = require('http-status-codes')
const customErrorCode = require('./custom-error')
const NotFoundError = require('./not-found')
const UnauthorizedError = require('./unauthorized')
const BadRequestError = require('./bad-request')

module.exports = {
    customErrorCode,
    NotFoundError,
    UnauthorizedError,
    BadRequestError
}