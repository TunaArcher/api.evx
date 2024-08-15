const { JWT_SECRET, JWT_SECRET_REFRESH_TOKEN } = require('../utils/secrets');

const jwt = require('jsonwebtoken');
const AsyncHandler = require('express-async-handler');
const AuthError = require('./error/AuthError');

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError)
        return res.status(401).send({ message: 'Unauthorized! Access Token expired!' });

    return res.sendStatus(401).send({ message: 'Unauthorized!' });
};

const jwtValidate = AsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // extract token
            token = req.headers.authorization.split(' ')[1];

            // verify token
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) return catchError(err, res);

                req.userId = decoded.id;

                next();
            });
        } catch (e) {
            throw new AuthError('Unauthorized');
        }
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
