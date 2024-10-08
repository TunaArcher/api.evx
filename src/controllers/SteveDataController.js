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
    const { ev_chargepoint_name, connector_pk } = req.body;

    try {
        const connecter = await SteveData.findEVStationConnecterStatus(ev_chargepoint_name, connector_pk);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Connecter Status Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getStartTransectionLast = AsyncHandler(async (req, res) => {
    const { connector_pk, id_tag } = req.body;

    try {
        const connecter = await SteveData.findStartTrasectionLast(connector_pk, id_tag);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Start Transections Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const addTransection = AsyncHandler(async (req, res) => {
    const { type, user_id, credit, transectionstate, cp_id, connecter_id, id_tag, transection_pk, connecter_pk } = req.body;

    let options = {
        type: type,
        user_id: user_id,
        credit: credit,
        transectionstate: transectionstate,
        cp_id: cp_id,
        connecter_id: connecter_id,
        id_tag: id_tag,
        transection_pk: transection_pk,
        connecter_pk: connecter_pk,
    };

    try {
        const addTransection = await SteveData.insertTransection(options);

        if (!addTransection) throw new ApiError('Internal Server Error! Server failed insert treansection.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('insert treansection successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getStation,
    getConnecter,
    getConnecterStatus,
    getStartTransectionLast,
    addTransection,
};
