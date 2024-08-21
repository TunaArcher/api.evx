const { JWT_SECRET, JWT_SECRET_REFRESH_TOKEN } = require('../utils/secrets');

const jwt = require('jsonwebtoken');
const AsyncHandler = require('express-async-handler');
const AuthError = require('./error/AuthError');

const { TokenExpiredError } = jwt;
const { StatusCodes } = require('http-status-codes');

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        throw new AuthError('Unauthorized! Access Token expired!', StatusCodes.UNAUTHORIZED);
    }

    throw new AuthError('Unauthorized!', StatusCodes.FORBIDDEN);
};

const jwtValidate = AsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // extract token
        token = req.headers.authorization.split(' ')[1];

        // verify token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            
            if (err) return catchError(err, res);

            req.userId = decoded.id;

            next();
        });
    }

    if (!token) throw new AuthError('Unauthorized, JWT Token not found');
});

const jwtRefreshTokenValidate = AsyncHandler(async (req, res, next) => {
    try {
        if (!req.headers['authorization']) return res.sendStatus(401);
        const token = req.headers['authorization'].replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) throw new Error(error);

            req.user = decoded;
            req.user.token = token;
            delete req.user.exp;
            delete req.user.iat;
        });
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
});

module.exports = {
    jwtValidate,
    jwtRefreshTokenValidate,
};
