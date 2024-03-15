const jwt = require('jsonwebtoken')
const errorHandler = require('./error')

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(errorHandler(401, 'Unauthorized!'))
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden!'))
        req.user = user
        next()
    })
}

const authorizeUser = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.userRole === 'admin' || req.user.userRole === 'client' || req.user.userRole === 'driver' || req.user.userRole === 'vendor') {
            next()
        } else {
            return next(errorHandler(404, 'Forbidden!'))
        }
    })
}

const authorizeVendor = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.userRole ==='vendor') {
            next()
        } else {
            return next(errorHandler(404, 'Forbidden!'))
        }
    })
}

const authorizeDriver = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.userRole === 'driver') {
            next()
        } else {
            return next(errorHandler(404, 'Forbidden!'))
        }
    })
}

const authorizeClient = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.userRole === 'client') {
            next()
        } else {
            return next(errorHandler(404, 'Forbidden!'))
        }
    })
}

const authorizeAdmin = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.userRole === 'admin') {
            next()
        } else {
            return next(errorHandler(404, 'Forbidden!'))
        }
    })
}

module.exports = { verifyUser, authorizeUser, authorizeDriver, authorizeClient, authorizeAdmin, authorizeVendor}