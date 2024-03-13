const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const User = require('../models/UserModel');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

/**
 * @desc Register new user
 * @route POST /api/auth/register/
 * @access public
 */
const register = AsyncHandler(async (req, res) => {
    const { phone, password, firstname, lastname } = req.body;

    try {
        // create user
        const user = new User(phone, hashPassword(password.trim()), firstname, lastname);
        console.log(user);
        const createUser = await user.save();

        if (!createUser) throw new ApiError('Internal Server Error! Server failed creating new user.');

        const responseData = {
            token: generateToken(createUser.insertId),
        };

        res.status(StatusCodes.CREATED).json(
            ApiResponse('User registered successfully.', responseData, StatusCodes.CREATED)
        );
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

/**
 * @desc authenticate user (login)
 * @route POST /api/auth/login
 * @access public
 */
const login = AsyncHandler(async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.findByPhone(phone);
        const authenticate = user && comparePassword(password.trim(), user.password);
        if (!authenticate) {
            throw new ApiError('Invalid credentials!', StatusCodes.UNAUTHORIZED, {
                credentials: { phone, password },
            });
        }

        const responseData = {
            id: user.id,
            username: user.firstname,
            email: user.email,
            token: generateToken(user.id),
        };

        res.status(StatusCodes.OK).json(ApiResponse('User logged in successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

/**
 * @desc get currently authenticated user (login)
 * @route GET /api/users/me
 * @access private
 */
// const getCurrentUser = AsyncHandler(async (req, res) => {
//     const responseData = req.user;
//     res.status(StatusCodes.OK).json(ApiResponse('Current user data.', { user: responseData }));
// });

module.exports = {
    register,
    login,
    // getCurrentUser,
};
