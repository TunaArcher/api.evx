const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const Service = require('../models/ServiceModel');
const Booking = require('../models/BookingModel');
// const Wallet = require('../models/WalletModel');

const { options } = require('joi');
const { log } = require('winston');

const getReportHistoryServiced = AsyncHandler(async (req, res) => {
    try {
        const serviced = await Service.find();

        const responseData = serviced;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getReportBooking = AsyncHandler(async (req, res) => {
    try {
        const booking = await Booking.find();

        const responseData = booking;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

// const getReportTopup = AsyncHandler(async (req, res) => {
//     try {
//         const wallet = await Wallet.find();

//         const responseData = wallet;

//         res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData));
//     } catch (err) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
//     }
// });

module.exports = {
    getReportHistoryServiced,
    getReportBooking,
    // getReportTopup,
};
