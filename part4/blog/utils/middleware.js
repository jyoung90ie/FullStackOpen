const logger = require('../utils/logger')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response
            .status(401)
            .json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response
            .status(401)
            .json({ error: 'invalid token' })
    } else if (error.name === 'CastError') {
        return response
            .status(400)
            .json({ error: 'invalid id' })
    }

    logger.error(error.message)

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}