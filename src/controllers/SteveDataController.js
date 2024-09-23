const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const SteveData = require('../models/SteveDataModel');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { options } = require('joi');
const { log } = require('winston');

const getStation = AsyncHandler(async (req, res) => {
    const { charge_box_id } = req.body;

    try {
        const evstation = await SteveData.findEVStationByName(charge_box_id);

        // ไม่เจอ station
        if (!evstation) throw new ApiError('Invalid credentials!', StatusCodes.UNAUTHORIZED);

        const responseData = {
            charge_box_id: evstation.charge_box_id,
        };

        res.status(StatusCodes.OK).json(ApiResponse('User Get is successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getConnecter = AsyncHandler(async (req, res) => {
    const { charge_box_id } = req.body;

    try {
        const connecter = await SteveData.findEVStationConnecterByName(charge_box_id);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Connecter Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getConnecterStatus = AsyncHandler(async (req, res) => {
    const { ev_chargepoint_name,  connector_pk} = req.body;

    try {
        const connecter = await SteveData.findEVStationConnecterStatus(ev_chargepoint_name, connector_pk);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Connecter Status Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getStation,
    getConnecter,
    getConnecterStatus,
};
