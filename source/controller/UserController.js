const Users = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const {
    BadRequestError,
    UnauthorizedError
} = require('../error/index')

const register = async (req, res, next) => {
    // const User = await Users.create({...req.body})
    // const token = await User.createJWT()
    // res.status(StatusCodes.CREATED).json({user: User.name,token: token})
    res.send('dit me may chu khon na vai lz')
}

const login = async (req, res, next) => {
    const {password,email} = req.body
    if (!password || !email) {
        throw new BadRequestError('Please provide email and password')
    }

    const User = await Users.findOne({email})
    if (!User) {
        throw new UnauthorizedError('Dont find user')
    }


    const isComparePass = User.comparePassword(password);
    if (!isComparePass){
        throw new UnauthorizedError('Password is incorrect')
    }

    const token = await User.createJWT()
    res.status(StatusCodes.OK).json({user: User.name,token: token})
}
module.exports = {
    login,
    register
}