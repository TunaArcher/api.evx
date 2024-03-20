const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const User = require('../models/UserModel');

const index = AsyncHandler(async (req, res) => {
    try {
        const user = await User.findByPhone(req.user.phone);

        const responseData = {
            id: user.id,
            phone: user.phone,
            status: user.status,
        };

        res.status(StatusCodes.OK).json(ApiResponse('User Index()', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    index,
};
