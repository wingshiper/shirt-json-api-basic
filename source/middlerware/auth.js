const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../error/index')
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthorizedError('Invalidate Certainer1')
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,'secret')
        req.user = {
            userId: payload.userId,
            userName : payload.userName
        }
        next()
    }catch(err){
        throw new UnauthorizedError('Invalidate Certainer2')

    }
   
}


module.exports = auth