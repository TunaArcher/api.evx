/*==============================
core
==============================*/
const express = require('express');

/*==============================
helper
==============================*/
const AsyncHandler = require('express-async-handler');
const ApiResponse = require('../controllers/response/ApiResponse');
const { StatusCodes } = require('http-status-codes');

// importing all routes
const router = express.Router();
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');

// assign prefix - to routes
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);

module.exports = router;
