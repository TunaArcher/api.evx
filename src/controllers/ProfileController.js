const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const Profile = require('../models/ProfileModels');
const Password = require('../models/PasswordModels');
const User = require('../models/UserModel');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
const { options } = require('joi');
const { log } = require('winston');

/**
 * @desc  profile (update profile)
 * @route POST /api/profile/update_profile
 * @access public
 */
const updateProfile = AsyncHandler(async (req, res) => {
    const { phone, firstname, lastname, email, id } = req.body;

    let options = {
        phone: phone,
        firstName: firstname,
        lastName: lastname,
        email: email,
    };

    try {
        // update profile
        const profile_data = await Profile.findByIdAndUpdate(id, options);

        if (!profile_data) throw new ApiError('Internal Server Error! Server failed creating update profile.');

        const responseData = {
            token_update: generateToken(profile_data),
        };

        res.status(StatusCodes.CREATED).json(
            ApiResponse('profile updated successfully.', responseData, StatusCodes.CREATED)
        );

        // res.status(StatusCodes.OK).json(ApiResponse('User logged in successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const porfileData = AsyncHandler(async (req, res) => {
    const { id } = req.body;

    try {
        const prifile = await User.findById(id);

        const responseData = {
            id: prifile.id,
            phone: prifile.phone,
            status: prifile.status,
            email: prifile.email,
            firstname: prifile.firstname,
            lastname: prifile.lastname,
        };

        res.status(StatusCodes.OK).json(ApiResponse('Profile Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updatePassword = AsyncHandler(async (req, res) => {
    const { id, oldPass, newPass, confNewPass } = req.body;
    let options = {
        id: id,
        password: oldPass,
        newPassword: hashPassword(newPass.trim()),
        confNewPassword: hashPassword(confNewPass.trim()),
    };

    try {
        
        // update profile
        const profile_data = await Password.findByIdAndUpdatePassword(id, options);

        if (!profile_data) throw new ApiError('Internal Server Error! Server failed creating update profile.');

        const responseData = {
            token_update: generateToken(profile_data),
        };

        res.status(StatusCodes.CREATED).json(
            ApiResponse('password updated successfully.', responseData, StatusCodes.CREATED)
        );

        // res.status(StatusCodes.OK).json(ApiResponse('User logged in successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    updateProfile,
    porfileData,
    updatePassword,
};
