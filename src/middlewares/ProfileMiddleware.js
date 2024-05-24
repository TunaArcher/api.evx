const jwt = require('jsonwebtoken');
const AsyncHandler = require('express-async-handler');
const Profile = require('../models/ProfileModels');
const AuthError = require('./error/AuthError');

const ProfileUpdate = AsyncHandler(async (request, response, next) => {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        try {
            // extract token
            token = request.headers.authorization.split(' ')[1];

            console.log(jwt.verify(token, process.env.JWT_SECRET_KEY))

            // verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

            next();
        } catch (e) {

            if (process.env.ENVIRONMENT === 'development') {
                console.log(e);
            }
            
            throw new AuthError('Profile Not Update');
        }
    }

    if (!token) {
        throw new AuthError('Profile Not Update, JWT Token not found');
    }
});

module.exports = ProfileUpdate;
